import { UNL_API_KEY, UNL_VPM_ID } from '../../config/config';
import { useEffect } from 'react';
// import UnlSdk from 'unl-map-js';
import { Marker, Map, MapGeoJSONFeature } from 'maplibre-gl';
import {
  Destination,
  Source,
  MapMarker,
  // AutoMarker,
  AutoCompass,
  ZoomOut,
  ZoomIn,
} from '@/assets/images';
// import greenIcon from '../../assets/images/icon/red.svg';
// import { getLocationFromCoordinates } from '@/services/apis/home-insurance';
import { AxiosResponse } from 'axios';
import {
  getGeoRoute,
  getLocationFromCoordinates,
} from '@/services/apis/geoCoding';
import { createCustomButtonPopup } from '@/helpers/utils';
import { Point, transitProps } from '@/services/types/automotive-insurance';

interface MapProps {
  tileSelectionEnable?: boolean;
  gridEnable?: boolean;
  location?: { latitude: number; longitude: number };
  markerType?: string;
  setSideBar?: () => void;
  sidbar?: string;
  elevation?: boolean;
  draggable?: boolean;
  zoom?: number;
  setZoom?: (value: number) => void;
  sourceRegion?: string;
  destinationRegion?: string;
  insurances?: { start: string; end: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  address?: AxiosResponse<any, any> | undefined;
  setCoordinates?: (long: number, lat: number) => void;
  setMarkerType?: (type: string) => void;
  sourceMarker?: boolean;
  destinationMarker?: boolean;
  source?: { latitude: number; longitude: number };
  destination?: { latitude: number; longitude: number };
  setSourceSearch?: (value: string) => void;
  setDestinationSearch?: (value: string) => void;
  setSourceCoordinates?: (long: number, lat: number) => void;
  setDestinationCoordinates?: (long: number, lat: number) => void;
  sourceSearch?: string;
  destinationSearch?: string;
  setAutomotiveSourceGeoData?: (data: MapGeoJSONFeature[]) => void;
  setAutomotiveDestinationGeoData?: (data: MapGeoJSONFeature[]) => void;
  route?: string[];
  isRefetching?: boolean;
  listingRoute?: string[];
  locationCoordinates?: { source: Point; destination: Point };
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MapboxDraw?: any;
  }
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    UnlSdk?: any;
  }
}

const AutoMotiveMapComponent: React.FC<MapProps> = ({
  tileSelectionEnable = false,
  gridEnable = true,
  location,
  setSideBar,
  elevation,
  draggable = false,
  zoom,
  setZoom,
  insurances,
  address,
  sourceMarker,
  destinationMarker,
  source,
  destination,
  sidbar,
  setSourceSearch,
  setDestinationSearch,
  setSourceCoordinates,
  setDestinationCoordinates,
  destinationSearch,
  sourceSearch,
  setAutomotiveSourceGeoData,
  setAutomotiveDestinationGeoData,
  route,
  listingRoute,
}) => {
  let sourceAddress = sourceSearch;
  let destinationAddress = destinationSearch;

  function getStringInsideParentheses(str: string) {
    const json = '[' + str + ']';
    const array = JSON.parse(json);
    return array;
  }

  let sourceCompass: Marker;
  let destinationCompass: Marker;
  let zoomLevel = sidbar === 'Home' ? 4 : 14;

  useEffect(() => {
    const containerELE = document.getElementById('map');

    if (containerELE) {
      const map = new window.UnlSdk.Map({
        container: containerELE,
        apiKey: UNL_API_KEY,
        vpmId: UNL_VPM_ID,
        gridControl: gridEnable,
        tilesSelectorControl: tileSelectionEnable,
        center:
          location?.latitude && location?.longitude
            ? [location?.longitude, location?.latitude]
            : [103.857461, 1.29512],
        zoom: zoom || 14,
        interactive: true,
        scrollZoom: true,

        style:
          'https://api.maptiler.com/maps/streets/style.json?key=sv8EJBnh0hTAqRleRS4s',
      });

      if (elevation) {
        map.setBearing(60);
        map.setPitch(80);
      } else {
        map.setBearing(0);
        map.setPitch(0);
      }

      createCustomButtonPopup(
        ZoomOut,
        'zoomOut',
        `right-[10px] ${
          sidbar === 'Home' ? 'top-[183px]' : 'top-[76px]'
        }  rounded-t-5 border-b-0`,
        () => {
          zoomLevel -= 1;
          map.setZoom(zoomLevel);
        }
      );

      createCustomButtonPopup(
        ZoomIn,
        'zoomIn',
        `right-[10px] ${
          sidbar === 'Home' ? 'top-[227px]' : 'top-[120px]'
        } border-t-0  rounded-b-5`,
        () => {
          zoomLevel += 1;
          map.setZoom(zoomLevel);
        }
      );

      map.on('zoom', () => {
        const currentZoom = map.getZoom();
        if (currentZoom && setZoom != undefined) {
          setZoom(currentZoom);
        }
      });

      const sourceFeature = () => {
        if (source?.latitude && source?.longitude && sidbar === 'risk') {
          if (!map.loaded()) {
            return;
          }
          const points = map.project([source?.longitude, source?.latitude]);
          const features = map.queryRenderedFeatures(points);
          if (setAutomotiveSourceGeoData != undefined)
            setAutomotiveSourceGeoData(features);
          map.off('render', sourceFeature);
        }
      };

      const destinationFeature = () => {
        if (
          destination?.latitude &&
          destination?.longitude &&
          sidbar === 'risk'
        ) {
          if (!map.loaded()) {
            return;
          }
          const points = map.project([
            destination?.longitude,
            destination?.latitude,
          ]);
          const features = map.queryRenderedFeatures(points);
          if (setAutomotiveDestinationGeoData != undefined)
            setAutomotiveDestinationGeoData(features);
          map.off('render', destinationFeature); // remove this handler now that we're done.
        }
      };

      map.on('render', sourceFeature);
      map.on('render', destinationFeature);

      if (route && sidbar === 'risk') {
        createRoute(map, route);
      }

      if (insurances) {
        const start = getStringInsideParentheses(insurances?.start);
        if (start) map.setCenter(start);

        const element1 = createMarker(
          // sidbar === 'risk' ? MapMarker : AutoMarker
          MapMarker
        );
        new window.UnlSdk.Marker(element1, { draggable: draggable })
          .setLngLat(start)
          .addTo(map);
        const end = getStringInsideParentheses(insurances?.end);
        const element2 = createMarker(
          // sidbar === 'risk' ? MapMarker : AutoMarker,
          MapMarker,
          'destination'
        );
        new window.UnlSdk.Marker(element2, { draggable: draggable })
          .setLngLat(end)
          .addTo(map);
        if (listingRoute) createRoute(map, listingRoute);
      }

      if (sourceMarker || sidbar === 'risk') {
        const element = createMarker(MapMarker);

        // add marker to map
        sourceCompass = new window.UnlSdk.Marker(element, {
          draggable: draggable,
        })
          .setLngLat([source && source.longitude, source && source.latitude])
          .addTo(map);

        if (source)
          map?.setCenter([
            source && source.longitude,
            source && source.latitude,
          ]);
        sourceCompass?.on('dragstart', function () {
          const existingElement = document.getElementById('marker');
          existingElement?.parentNode?.removeChild(existingElement);
          if (map.getLayer('route') && map.getSource('route')) {
            map.removeLayer('route');
            map.removeSource('route');
          }
        });

        sourceCompass?.on('dragend', function () {
          getLocationFromCoordinates({
            longitude: sourceCompass.getLngLat()?.lng,
            latitude: sourceCompass.getLngLat()?.lat,
          }).then((res) => {
            setSourceCoordinates &&
              setSourceCoordinates(
                sourceCompass.getLngLat()?.lng,
                sourceCompass.getLngLat()?.lat
              );

            setSourceSearch && setSourceSearch(res?.data.data.name);
            sourceAddress = res?.data.data.name;
            if (
              sourceAddress &&
              destinationAddress &&
              destinationMarker &&
              sourceMarker
            )
              createMarkerPopup(sourceCompass);
            if (source && destination) {
              getGeoRoute({
                startPoint: {
                  latitude: sourceCompass.getLngLat()?.lat,
                  longitude: sourceCompass.getLngLat()?.lng,
                },
                endPoint: {
                  latitude: destinationCompass.getLngLat()?.lat,
                  longitude: destinationCompass.getLngLat()?.lng,
                },
              }).then((res) => {
                const transit: transitProps = {
                  duration: (res?.data.data.overview.duration / 60)
                    .toFixed(2)
                    .toString(),
                  distance: (res?.data.data.overview.length / 1000)
                    .toFixed(2)
                    .toString(),
                };
                createRoute(map, res?.data?.data.overview.linestring);
                createTransit(transit);
              });
            }
          });
        });
      }

      if (destinationMarker || sidbar === 'risk') {
        const element = createMarker(MapMarker, 'destination');
        // add marker to map
        destinationCompass = new window.UnlSdk.Marker(element, {
          draggable: draggable,
        })
          .setLngLat([
            destination && destination.longitude,
            destination && destination.latitude,
          ])
          // .setLngLat([103.85986, 1.29371])
          .addTo(map);
        map?.setCenter([
          destination && destination.longitude,
          destination && destination.latitude,
        ]);

        if (
          sourceAddress &&
          destinationAddress &&
          destinationMarker &&
          sourceMarker
        ) {
          createMarkerPopup(destinationCompass);
          if (source && destination) {
            getGeoRoute({ startPoint: source, endPoint: destination }).then(
              (res) => {
                const transit: transitProps = {
                  duration: (res?.data.data.overview.duration / 60)
                    .toFixed(2)
                    .toString(),
                  distance: (res?.data.data.overview.length / 1000)
                    .toFixed(2)
                    .toString(),
                };
                createRoute(map, res?.data?.data.overview.linestring);
                createTransit(transit);
              }
            );
          }
        }

        destinationCompass?.on('dragstart', function () {
          const existingElement = document.getElementById('marker');
          existingElement?.parentNode?.removeChild(existingElement);

          if (map.getLayer('route') && map.getSource('route')) {
            map.removeLayer('route');
            map.removeSource('route');
          }
        });

        destinationCompass?.on('dragend', function () {
          getLocationFromCoordinates({
            longitude: destinationCompass.getLngLat()?.lng,
            latitude: destinationCompass.getLngLat()?.lat,
          }).then((res) => {
            setDestinationCoordinates &&
              setDestinationCoordinates(
                destinationCompass.getLngLat()?.lng,
                destinationCompass.getLngLat()?.lat
              );

            setDestinationSearch && setDestinationSearch(res?.data.data.name);
            destinationAddress = res?.data.data.name;
            if (destinationMarker && sourceMarker)
              createMarkerPopup(destinationCompass);
          });

          getGeoRoute({
            startPoint: {
              latitude: sourceCompass.getLngLat()?.lat,
              longitude: sourceCompass.getLngLat()?.lng,
            },
            endPoint: {
              latitude: destinationCompass.getLngLat()?.lat,
              longitude: destinationCompass.getLngLat()?.lng,
            },
          }).then((res) => {
            const transit: transitProps = {
              duration: (res?.data.data.overview.duration / 60)
                .toFixed(2)
                .toString(),
              distance: (res?.data.data.overview.length / 1000)
                .toFixed(2)
                .toString(),
            };
            createRoute(map, res?.data?.data.overview.linestring);
            createTransit(transit);
          });
        });
      }

      // if (window.MapboxDraw ) {
      //   const draw = new window.MapboxDraw({
      //     displayControlsDefault: false,
      //     controls: {
      //       polygon: true,
      //       trash: true,
      //     },
      //   });
      //   map.addControl(draw);
      // }
    }
  }, [
    elevation,
    insurances,
    location,
    address,
    sourceMarker,
    destinationMarker,
    route,
  ]);

  const createTransit = (transitDetails: transitProps) => {
    const transit = document.createElement('div');
    const transitHead = document.createElement('div');
    const transitTimeMain = document.createElement('div');
    const transitTimeLabel = document.createElement('span');
    const transitTimeValue = document.createElement('span');
    const transitTimeUnit = document.createElement('span');
    const transitDistMain = document.createElement('div');
    const transitDistLabel = document.createElement('span');
    const transitDistValue = document.createElement('span');
    const transitDistUnit = document.createElement('span');

    transitHead.textContent = 'Transit Details';
    transitHead.className =
      'border-b border-gray-variant-8 w-full text-[11px] font-medium leading-[14px] font-apercu pb-2';

    transit.appendChild(transitHead);
    transit.appendChild(transitTimeMain);
    transit.appendChild(transitDistMain);

    transitTimeMain.className = 'mt-3';
    transitDistMain.className = 'mt-1';

    transitTimeLabel.textContent = 'Time : ';
    transitTimeValue.textContent = transitDetails.duration;
    transitTimeUnit.textContent = 'Mins';
    transitTimeLabel.className =
      'font-[13px] font-medium leading-4 font-apercu text-black';
    transitTimeValue.className =
      'font-[13px] font-medium leading-4 font-apercu text-black/[0.64]';
    transitTimeUnit.className =
      'font-[13px] font-medium leading-4 font-apercu text-black/[0.64]';

    transitTimeMain.appendChild(transitTimeLabel);
    transitTimeMain.appendChild(transitTimeValue);
    transitTimeMain.appendChild(transitTimeUnit);

    transitDistLabel.textContent = 'Distance : ';
    transitDistValue.textContent = transitDetails.distance;
    transitDistUnit.textContent = 'Kms';
    transitDistLabel.className =
      'font-[13px] font-medium leading-4 font-apercu text-black';
    transitDistValue.className =
      'font-[13px] font-bold leading-4 font-apercu text-black';
    transitDistUnit.className =
      'font-[13px] font-bold leading-4 font-apercu text-black';

    transitDistMain.appendChild(transitDistLabel);
    transitDistMain.appendChild(transitDistValue);
    transitDistMain.appendChild(transitDistUnit);
    const transitLoaderElement = document.getElementById('transit-loader');
    transitLoaderElement?.parentNode?.removeChild(transitLoaderElement);
    const existingElement = document.getElementById('marker');

    existingElement?.appendChild(transit);

    const button = document.createElement('button');
    button.textContent = 'Confirm Route';
    button.className =
      'location-popup-btn-fit mt-[22px] font-medium text-sm leading-17 font-apercu';
    existingElement?.appendChild(button);

    button.addEventListener('click', () => {
      if (setSideBar != undefined) {
        setSideBar();
      }
    });
  };

  const createMarkerPopup = (markers?: Marker) => {
    const existingElement = document.getElementById('marker');
    existingElement?.parentNode?.removeChild(existingElement);
    const element = markers?.getElement();
    const main = document.createElement('div');
    main.id = 'marker';
    const source = document.createElement('p');
    const destination = document.createElement('p');
    const locWrap = document.createElement('div');
    const nameLocWrap = document.createElement('div');
    const dotWrap = document.createElement('div');
    const sourceIcon = document.createElement('img');
    const destinationIcon = document.createElement('img');

    if (sourceAddress && destinationAddress) {
      source.textContent = sourceAddress;
      destination.textContent = destinationAddress;
    }
    main.className =
      'bg-white px-3 py-4 w-[268px] absolute border rounded-md z-40 bottom-6 left-10';

    sourceIcon.src = Source;
    destinationIcon.src = Destination;
    locWrap.className = 'flex flex-row mb-5';

    sourceIcon.className = 'h-3 mr-3 mt-1';
    source.className =
      'leading-17 text-sm font-medium font-apercu text-primary-gray';

    destinationIcon.className = 'h-4 mr-3 mt-1';
    destination.className =
      'leading-17 text-sm font-medium font-apercu text-primary-gray';

    nameLocWrap.className = 'flex flex-row mb-5';
    dotWrap.textContent = '---------------------------------------------------';
    locWrap.appendChild(sourceIcon);
    locWrap.appendChild(source);
    nameLocWrap.appendChild(destinationIcon);
    nameLocWrap.appendChild(destination);
    dotWrap.className = 'hidden';
    setTimeout(() => {
      const widthDot =
        destinationIcon.offsetTop -
        (sourceIcon.offsetTop + sourceIcon.clientHeight);
      dotWrap.className =
        'absolute top-[37px] left-[18px] rotate-90 origin-top-left text-primary-gray tracking-[3px] overflow-hidden h-[1px] leading-[1px]';
      dotWrap.style.width = widthDot - 5 + 'px';
    }, 100);

    main.appendChild(locWrap);
    main.appendChild(nameLocWrap);
    main.appendChild(dotWrap);
    const elevation1 = document.createElement('h2');
    const elevation2 = document.createElement('h2');
    const loaderContainer = document.createElement('div');
    loaderContainer.id = 'transit-loader';

    loaderContainer.className =
      'w-[268px]  text-lg font-apercu z-20 right-[1px] ';
    const className = ' w-[260px] skeleton mt-3';
    elevation1.className = `loading-card-title ${className}`;
    elevation2.className = `loading-card-heading ${className}`;
    loaderContainer.appendChild(elevation1);
    loaderContainer.appendChild(elevation2);
    main.append(loaderContainer);
    element?.appendChild(main);
  };

  const createMarker = (icon: string, value?: string) => {
    const element = document.createElement('div');

    const marker: HTMLImageElement = document.createElement('img');
    marker.src = AutoCompass;
    if (value === 'destination') {
      marker.className = 'absolute left-1 -top-7 z-10';
      element?.appendChild(marker);
    }
    element.style.backgroundImage = 'url(' + icon + ')';
    element.style.backgroundRepeat = 'no-repeat';

    element.style.width = 30 + 'px';
    element.style.height = 30 + 'px';
    return element;
  };

  const createRoute = (map: Map, route: string[]) => {
    const result: number[] = route?.map((val: string) => {
      const res = '[' + val + ']';
      return JSON.parse(res);
    });

    if (sidbar === 'insurance') {
      addRouteSource(result, map);
    } else {
      map.on('load', function () {
        addRouteSource(result, map);
      });
    }
  };

  const addRouteSource = (result: number[], map: Map) => {
    map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: result,
        },
      },
    });
    map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#4158D0',
        'line-width': 8,
      },
    });
  };

  return (
    <div
      className={`map-container h-full flex-1 cursor-default ${
        sidbar === 'single-automotive' ? 'w-[140vw]' : 'w-full'
      }`}
      id="map"
    ></div>
  );
};

export default AutoMotiveMapComponent;
