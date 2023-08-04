import { UNL_API_KEY, UNL_VPM_ID } from '../../config/config';
import { useEffect, useState } from 'react';
import { Marker, MapGeoJSONFeature, MapMouseEvent, Map } from 'maplibre-gl';
import {
  Compass,
  CompassBlue,
  Elevation,
  ElevationBlue,
  homeIcon,
  redIcon,
  ZoomIn,
  ZoomOut,
} from '@/assets/images';
import { HomeInsuranceData, LocationDetailsProps } from '@/Types/homeInsurance';
import {
  getElevation,
  getLocationFromCoordinates,
} from '@/services/apis/geoCoding';
import { AxiosResponse } from 'axios';
import {
  createCustomButtonPopup,
  createElevationMarkerPopup,
  createMarker,
  createMarkerPopup,
  generateLocationData,
  getStringInsideParentheses,
} from '@/helpers/utils';
interface MapProps {
  tileSelectionEnable?: boolean;
  gridEnable?: boolean;
  insuranceTypes?: string[];
  location?: { lat: null | number; long: null | number };
  markerType?: string;
  setSideBar?: () => void;
  sidbar?: string;
  draggable?: boolean;
  locationDetails?: LocationDetailsProps;
  insurances?: HomeInsuranceData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  address?: AxiosResponse<any, any> | undefined;
  setCoordinates?: (long: number, lat: number) => void;
  setMarkerType?: (type: string) => void;
  setHomeGeoData?: (data: MapGeoJSONFeature[]) => void;
  markerSelection?: boolean;
  setMarkerSelection?: () => void;
  createMapMarker?: () => void;
  refetch?: () => void;
  coordinates?: { lat: null | number; long: null | number };
  setPolygonCoordinates?: (data: string) => void;
  polygonCoordinates?: string;
  setHomePolicyFetch?: () => void;
  setFilterType?: (value: string) => void;
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

const MapComponent: React.FC<MapProps> = ({
  tileSelectionEnable = false,
  gridEnable = false,
  location,
  markerType,
  setSideBar,
  sidbar,
  draggable = false,
  locationDetails,
  insurances,
  address,
  setCoordinates,
  setHomeGeoData,
  coordinates,
  setPolygonCoordinates,
  refetch,
  setHomePolicyFetch,
  setFilterType,
}) => {
  let markerSelection = false;
  let isElevation = false;
  let zoomLevel = sidbar === 'Home' ? 4 : 14;
  let markers: Marker;
  const [currentView, setCurrentView] = useState('');
  let map: Map;

  useEffect(() => {
    const containerELE = document.getElementById('map');
    if (containerELE) {
      if (!map?.loaded()) {
        map = new window.UnlSdk.Map({
          container: containerELE,
          apiKey: UNL_API_KEY,
          vpmId: UNL_VPM_ID,
          gridControl: gridEnable,
          tilesSelectorControl: tileSelectionEnable,
          center:
            location?.lat && location?.long
              ? [location?.long, location?.lat]
              : [103.743293, 1.333512],
          zoom: zoomLevel,
          interactive: true,
          scrollZoom: true,
          style:
            'https://api.maptiler.com/maps/streets/style.json?key=sv8EJBnh0hTAqRleRS4s',
        });
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
          sidbar === 'Home' ? 'top-[227px]' : 'top-[116px]'
        } border-t-0  rounded-b-5`,
        () => {
          zoomLevel += 1;
          map.setZoom(zoomLevel);
        }
      );

      const elevation: HTMLImageElement = document.getElementById(
        'elevation'
      ) as HTMLImageElement;
      const compass: HTMLImageElement = document.getElementById(
        'compass'
      ) as HTMLImageElement;
      if (elevation) {
        elevation?.remove();
      }

      if (compass) {
        compass?.remove();
      }

      if (sidbar == 'Insurance') {
        createCustomButtonPopup(
          Elevation,
          'elevation',
          'right-2.5 top-[180px] rounded-t-5 border-b-0',
          () => {
            if (!isElevation) {
              const existingElement = document.getElementById('marker');
              if (!existingElement) return;
            } else {
              const existingElement =
                document.getElementById('elevation-input');

              if (!existingElement) return;
            }
            isElevation = !isElevation;

            const existingElement = document.getElementById('marker');
            if (isElevation) {
              if (!existingElement) return;
              setCurrentView('elevation');
              map.setBearing(60);
              map.setPitch(80);
              map.dragRotate.disable();
              const existingMarkerArrow =
                document.getElementById('markerArrow');
              existingElement?.parentNode?.removeChild(existingElement);
              existingMarkerArrow?.remove();
              if (markers?.getElement()) {
                getElevation({
                  longitude: markers?.getLngLat()?.lng,
                  latitude: markers?.getLngLat()?.lat,
                }).then((res) => {
                  createElevationMarkerPopup(
                    markers,
                    res.data.data?.elevation + res.data.data?.buildingElevation,
                    () => {
                      const existingElement =
                        document.getElementById('elevation-input');
                      existingElement?.remove();
                      isElevation = !isElevation;
                      map.setBearing(0);
                      map.setPitch(0);
                      const existingMarkerArrow =
                        document.getElementById('markerArrow');
                      existingMarkerArrow?.remove();
                      map.setCenter(markers?._lngLat);
                      if (
                        coordinates?.lat &&
                        coordinates?.long &&
                        !isElevation
                      ) {
                        getLocationFromCoordinates({
                          longitude: coordinates?.long,
                          latitude: coordinates?.lat,
                        }).then((res) => {
                          if (
                            sidbar != undefined &&
                            setSideBar != undefined &&
                            setCoordinates
                          ) {
                            setCoordinates(
                              markers?.getLngLat().lng,
                              markers?.getLngLat().lat
                            );

                            const locationData: LocationDetailsProps =
                              generateLocationData(res?.data.data);
                            createMarkerPopup(
                              locationData,
                              markers,
                              sidbar,
                              setSideBar
                            );
                          }
                        });
                      }
                    }
                  );
                });
              }
            } else {
              const existingElement =
                document.getElementById('elevation-input');

              if (!existingElement) return;

              if (markers) {
                map.dragRotate.enable();
                setCurrentView('');
                existingElement?.remove();
                map.setCenter(markers?._lngLat);
                map.setBearing(0);
                map.setPitch(0);
                getLocationFromCoordinates({
                  longitude: markers?.getLngLat().lng,
                  latitude: markers?.getLngLat()?.lat,
                }).then((res) => {
                  if (
                    sidbar != undefined &&
                    setSideBar != undefined &&
                    setCoordinates
                  ) {
                    const locationData: LocationDetailsProps =
                      generateLocationData(res?.data.data);
                    setCoordinates(
                      markers?.getLngLat().lng,
                      markers?.getLngLat().lat
                    );
                    createMarkerPopup(
                      locationData,
                      markers,
                      sidbar,
                      setSideBar
                    );
                  }
                });
              } else {
                map.setBearing(0);
                map.setPitch(0);
              }
            }
          }
        );
      }

      if (sidbar == 'Insurance') {
        if (!isElevation) {
          createCustomButtonPopup(
            Compass,
            'compass',
            'right-2.5 top-[224px] border-t-0  rounded-b-5',
            () => {
              if (isElevation) return;
              setCurrentView('marker');
              markerSelection = !markerSelection;
              if (markers?.getElement()) markers?.remove();
            }
          );
        }
      }
      map.on('mousemove', () => {
        if (sidbar === 'risk') return;
        if (!markerSelection) {
          map.getCanvas().classList?.remove('map-markers');
        } else {
          map.getCanvas().classList?.add('map-markers');
          const existingElement = document.getElementById('marker');
          if (existingElement) {
            existingElement?.remove();
            existingElement?.parentNode?.removeChild(existingElement);
          }
          map.on('click', (e: MapMouseEvent) => {
            const el = createMarker(homeIcon);
            if (markerSelection) {
              // add marker to map
              markers = new window.UnlSdk.Marker(el, { draggable: draggable })
                .setLngLat(e.lngLat)
                .addTo(map);

              if (markers?.getElement()) {
                markerSelection = false;
                map.getCanvas().classList?.remove('map-markers');
                getLocationFromCoordinates({
                  longitude: e.lngLat.lng,
                  latitude: e.lngLat.lat,
                }).then((res) => {
                  if (
                    sidbar &&
                    setSideBar != undefined &&
                    setCoordinates != undefined
                  ) {
                    setCoordinates(e.lngLat.lng, e.lngLat.lat);
                    const locationData: LocationDetailsProps =
                      generateLocationData(res?.data.data);

                    createMarkerPopup(
                      locationData,
                      markers,
                      sidbar,
                      setSideBar
                    );
                  }
                });
                markers.on('dragstart', function () {
                  const existingElement = document.getElementById('marker');
                  existingElement?.parentNode?.removeChild(existingElement);
                  const existingMarkerArrow =
                    document.getElementById('markerArrow');
                  existingMarkerArrow?.remove();
                  const existingCompassElement =
                    document.getElementById('elevation-input');
                  existingCompassElement?.parentNode?.removeChild(
                    existingCompassElement
                  );
                });

                markers.on('dragend', function () {
                  const locations = markers.getLngLat();
                  const lng = locations?.lng;
                  const lat = locations?.lat;

                  if (setCoordinates != undefined) {
                    setCoordinates(lng, lat);

                    if (!isElevation) {
                      getLocationFromCoordinates({
                        longitude: lng,
                        latitude: lat,
                      }).then((res) => {
                        if (sidbar != undefined && setSideBar != undefined) {
                          const locationData: LocationDetailsProps =
                            generateLocationData(res?.data.data);
                          createMarkerPopup(
                            locationData,
                            markers,
                            sidbar,
                            setSideBar
                          );
                        }
                      });
                    } else {
                      markers.on('dragstart', function () {
                        const existingMarkerArrow =
                          document.getElementById('markerArrow');
                        existingMarkerArrow?.remove();
                        const existingElement =
                          document.getElementById('elevation-input');
                        existingElement?.remove();
                      });
                      if (markers?.getElement()) {
                        getElevation({
                          longitude: markers?.getLngLat().lng,
                          latitude: markers?.getLngLat().lat,
                        }).then((res) => {
                          createElevationMarkerPopup(
                            markers,
                            res.data.data?.elevation +
                              res.data.data?.buildingElevation,
                            () => {
                              const existingElement =
                                document.getElementById('elevation-input');
                              existingElement?.remove();
                              const existingMarkerArrow =
                                document.getElementById('markerArrow');
                              existingMarkerArrow?.remove();
                              isElevation = !isElevation;
                              map.setBearing(0);
                              map.setPitch(0);
                              map.setCenter(markers?._lngLat);
                              setCoordinates(lng, lat);
                              getLocationFromCoordinates({
                                longitude: lng,
                                latitude: lat,
                              }).then((res) => {
                                if (
                                  sidbar != undefined &&
                                  setSideBar != undefined
                                ) {
                                  const locationData: LocationDetailsProps =
                                    generateLocationData(res?.data.data);
                                  createMarkerPopup(
                                    locationData,
                                    markers,
                                    sidbar,
                                    setSideBar
                                  );
                                }
                              });
                            }
                          );
                        });
                      }
                    }
                  }
                });
              }
            }
            setCurrentView('');
          });
        }
      });

      map.on('zoom', () => {
        const currentZoom = map.getZoom();
        zoomLevel = currentZoom;
      });

      const afterChangeComplete = () => {
        if (location?.lat && location?.long && sidbar == 'risk') {
          if (!map.loaded()) return;

          const points = map.project([location?.long, location?.lat]);
          const features = map.queryRenderedFeatures(points);
          if (setHomeGeoData != undefined) {
            setHomeGeoData(features);
          }
          map.off('render', afterChangeComplete); // remove this handler now that we're done.
        }
      };

      map.on('render', afterChangeComplete); // warning: this fires many times per second!

      const existingElement = document.getElementById('marker');
      existingElement?.parentNode?.removeChild(existingElement);

      if (
        sidbar === 'Insurance' &&
        markerType === 'location' &&
        location &&
        location?.lat !== null &&
        location?.long !== null &&
        setSideBar != undefined
      ) {
        const el = createMarker(homeIcon);

        // add marker to map
        markers = new window.UnlSdk.Marker(el, { draggable: draggable })
          .setLngLat([location.long, location.lat])
          .addTo(map);
        if (locationDetails)
          createMarkerPopup(locationDetails, markers, sidbar, setSideBar);

        markers.on('dragstart', function () {
          const existingElement = document.getElementById('marker');
          existingElement?.parentNode?.removeChild(existingElement);
          const existingMarkerArrow = document.getElementById('markerArrow');
          existingMarkerArrow?.remove();
          const existingCompassElement =
            document.getElementById('elevation-input');
          existingCompassElement?.remove();
        });

        markers.on('dragend', function () {
          const locations = markers.getLngLat();
          const lng = locations?.lng;
          const lat = locations?.lat;

          if (!isElevation) {
            const existingElement = document.getElementById('marker');
            const existingMarkerArrow = document.getElementById('markerArrow');
            existingMarkerArrow?.remove();
            existingElement?.parentNode?.removeChild(existingElement);
            if (
              setCoordinates != undefined &&
              coordinates?.lat &&
              coordinates?.long
            ) {
              setCoordinates(lng, lat);
              getLocationFromCoordinates({
                longitude: lng,
                latitude: lat,
              }).then((res) => {
                const locationData: LocationDetailsProps = generateLocationData(
                  res?.data.data
                );

                createMarkerPopup(locationData, markers, sidbar, setSideBar);
              });
            }
          } else {
            getElevation({
              longitude: markers?.getLngLat().lng,
              latitude: markers?.getLngLat().lat,
            }).then((res) => {
              createElevationMarkerPopup(
                markers,
                res.data.data?.elevation + res.data.data?.buildingElevation,
                () => {
                  const existingElement =
                    document.getElementById('elevation-input');
                  existingElement?.remove();
                  const existingMarkerArrow =
                    document.getElementById('markerArrow');
                  existingMarkerArrow?.remove();
                  map.setCenter(markers?._lngLat);
                  isElevation = !isElevation;
                  map.setBearing(0);
                  map.setPitch(0);
                  if (setCoordinates != undefined) {
                    setCoordinates(
                      markers?.getLngLat()?.lng,
                      markers?.getLngLat()?.lat
                    );
                    getLocationFromCoordinates({
                      longitude: markers?.getLngLat()?.lng,
                      latitude: markers?.getLngLat()?.lat,
                    }).then((res) => {
                      if (sidbar != undefined && setSideBar != undefined) {
                        const locationData: LocationDetailsProps =
                          generateLocationData(res?.data.data);
                        createMarkerPopup(
                          locationData,
                          markers,
                          sidbar,
                          setSideBar
                        );
                      }
                    });
                  }
                }
              );
            });
          }
        });

        markers.on('dragstart', function () {
          const existingElement = document.getElementById('marker');
          const existingMarkerArrow = document.getElementById('markerArrow');
          existingElement?.remove();
          existingMarkerArrow?.remove();
          const elevation = document.getElementById('elevation-input');
          elevation?.remove();
        });
      }

      if (
        location &&
        location?.lat !== null &&
        location?.long !== null &&
        sidbar === 'risk'
      ) {
        const el = createMarker(homeIcon);
        // add marker to map
        markers = new window.UnlSdk.Marker(el, { draggable: draggable })
          .setLngLat([location.long, location.lat])
          .addTo(map);

        if (address && sidbar === 'risk') {
          const locationData: LocationDetailsProps = generateLocationData(
            address?.data.data
          );
          createMarkerPopup(locationData, markers, sidbar);
        }
      }

      if (insurances?.data) {
        insurances?.data?.map((insurance) => {
          const el = createMarker(redIcon);
          const res = getStringInsideParentheses(insurance?.centre);
          if (res) {
            map?.setCenter(res);
            markers = new window.UnlSdk.Marker(el, { draggable: draggable })
              ?.setLngLat(res)
              ?.addTo(map);
            markers.getElement().addEventListener('click', () => {
              map.flyTo({
                center: res,
                zoom: 14,
                essential: true,
              });
            });
          }
        });
      }

      if (
        window.MapboxDraw &&
        sidbar === 'Home' &&
        setPolygonCoordinates &&
        setFilterType
      ) {
        const draw = new window.MapboxDraw({
          displayControlsDefault: false,
          controls: {
            polygon: true,
            trash: true,
          },
        });

        map?.addControl(draw);

        map?.on('draw.create', (e) => {
          setPolygonCoordinates(
            JSON.stringify(e.features[0].geometry.coordinates[0])
          );
          if (refetch) {
            setFilterType('polygon');
            refetch();
          }
        });

        map?.on('draw.update', (e) => {
          setPolygonCoordinates(
            JSON.stringify(e.features[0].geometry.coordinates[0])
          );
          if (refetch) {
            refetch();
          }
        });
        map?.on('draw.edit', (e) => {
          setPolygonCoordinates(
            JSON.stringify(e.features[0].geometry.coordinates[0])
          );
          if (refetch) {
            refetch();
          }
        });

        map?.on('draw.delete', () => {
          setPolygonCoordinates('');
          setFilterType('');
          if (setHomePolicyFetch && refetch) {
            setHomePolicyFetch();
            refetch();
          }
          setTimeout(() => {
            draw.deleteAll();
          }, 0);
        });
      }
    }
  }, [location, address, insurances]);

  useEffect(() => {
    const elevation: HTMLImageElement = document.getElementById(
      'elevation'
    ) as HTMLImageElement;
    const compass: HTMLImageElement = document.getElementById(
      'compass'
    ) as HTMLImageElement;
    if (elevation) {
      if (currentView === 'elevation') {
        elevation.src = ElevationBlue;
      } else {
        elevation.src = Elevation;
      }
    }
    if (compass) {
      if (currentView === 'marker') {
        compass.src = CompassBlue;
      } else {
        compass.src = Compass;
      }
    }
  }, [currentView]);

  return (
    <div
      className={`map-container h-full flex-1 cursor-default ${
        sidbar === 'Home' ? 'w-[140vw]' : 'w-full'
      }`}
      id="map"
    ></div>
  );
};

export default MapComponent;
