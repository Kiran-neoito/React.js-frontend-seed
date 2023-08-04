import AutoMotiveMapComponent from '../../components/Map/AutoMotiveMapComponent';
// import ZoomIn from '../../assets/images/icon/Plus.svg';
// import ZoomOut from '../../assets/images/icon/Minus.svg';
// import Compass from '../../assets/images/icon/Compas.svg';
import { useEffect, useRef, useState } from 'react';
import { MapGeoJSONFeature } from 'maplibre-gl';
import RiskGeoData from '../AutomotiveInsurance/Components/RiskGeoData';
import { useMutation, useQuery } from '@tanstack/react-query';
import { searchLocation } from '@/services/apis/geoCoding';
import { AxiosError, AxiosResponse } from 'axios';
// import Spinner from '@/components/Loader/SuspenseLoader';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createAutomotivePolicy } from '@/services/apis/automotive-insurance';
import { Destination, Source, Close, SearchImg } from '@/assets/images';
import { CreatSingleAutoParams } from '@/services/types/automotive-insurance';
import { getGeoRoute } from '@/services/apis/geoCoding';
import { ClipLoader } from 'react-spinners';
export interface automotivegeoProps {
  traffic_flow_indication: string;
  road_type: string;
  road_direction: string;
  road_length: string;
  road_turn_risk: string;
  junction_risk: string;
  traffic_light_risk: string;
  accident_risk: string;
  vehicle_type: string;
  flood_risk: string;
  weather_risk: string;
  crime_risk: string;
}

const CreateSingleAutomotiveInsurance: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const searchRefDest = useRef<HTMLInputElement>(null);
  const [sideBar, setSideBar] = useState('insurance');
  const [zoom, setZoom] = useState(15);
  const [markerType, setMarkerType] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [sourceSearch, setSourceSearch] = useState('');
  const [sourceMarker, setSourceMarker] = useState(false);
  const [destinationMarker, setDestinationMarker] = useState(false);
  const [destinationSearch, setDestinationSearch] = useState('');
  const [locationType, setLocationType] = useState('');
  const [editDestination, setEditDestination] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [autoGeoRoute, setAutoGeoRoute] = useState<[]>([]);
  const [automotiveSourceGeoData, setAutomotiveSourceGeoData] = useState<
    MapGeoJSONFeature[] | null
  >(null);
  const [automotiveDestinationGeoData, setAutomotiveDestinationGeoData] =
    useState<MapGeoJSONFeature[] | null>(null);

  const [geoData, setGeoData] = useState<automotivegeoProps>({
    traffic_flow_indication: 'false',
    road_type: 'false',
    road_direction: 'false',
    road_length: 'false',
    road_turn_risk: 'false',
    junction_risk: 'false',
    traffic_light_risk: 'false',
    accident_risk: 'false',
    vehicle_type: 'false',
    flood_risk: 'false',
    weather_risk: 'false',
    crime_risk: 'false',
  });

  const [center, setCenter] = useState<{
    latitude: number;
    longitude: number;
  }>({ longitude: 103.857461, latitude: 1.29512 });

  const [source, setSource] = useState<{
    latitude: number;
    longitude: number;
  }>({ longitude: 103.857461, latitude: 1.29512 });

  const [destination, setDestination] = useState<{
    latitude: number;
    longitude: number;
  }>({ longitude: 103.857461, latitude: 1.29512 });

  const searchMutation = useMutation({
    mutationFn: searchLocation,
    onSuccess: (res: AxiosResponse) => {
      if (res.data?.message === 'Address Not Found') {
        setApiError(res.data?.message);
        setDestinationMarker(false);
      } else {
        res.data.data.address.countryCode &&
          setCountryCode(res.data.data.address.countryCode);
        if (
          res.data.data.coordinates &&
          Object.keys(res.data.data.coordinates)
        ) {
          setCenter({
            latitude: res.data.data.coordinates.latitude,
            longitude: res.data.data.coordinates.longitude,
          });
          setMarkerType('location');
          if (locationType == 'Source') {
            setSourceMarker(true);
            setEditDestination(true);
            setSource({
              latitude: res.data.data.coordinates.latitude,
              longitude: res.data.data.coordinates.longitude,
            });
          } else if (locationType == 'Destination') {
            setDestinationMarker(true);
            setEditDestination(false);
            setDestination({
              latitude: res.data.data.coordinates.latitude,
              longitude: res.data.data.coordinates.longitude,
            });
          }
        }
      }
    },
    onError: (err: AxiosError<{ message: string }>) => {
      if (err.response?.data?.message) setApiError(err.response.data.message);
    },
  });

  const GeoRoute = useQuery({
    enabled: false,
    staleTime: 10 * 1000,
    queryKey: ['geo-route'],
    onSuccess: (e) => {
      setAutoGeoRoute(e?.data?.data.overview?.linestring);
    },
    keepPreviousData: false,
    queryFn: () => getGeoRoute({ startPoint: source, endPoint: destination }),
  });

  const createPolicyMutation = useMutation({
    mutationFn: createAutomotivePolicy,
    onSuccess: () => {
      navigate(
        `/automotive-insurance${
          searchParams.get('parent') ? `/${searchParams.get('parent')}` : ''
        }`
      );
    },
  });

  const handleCreatePolciy = () => {
    let policyData: CreatSingleAutoParams = {
      geoData: {
        source: automotiveSourceGeoData,
        destination: automotiveDestinationGeoData,
      },

      country: countryCode || 'SGP',
      startPoint: {
        latitude: source.latitude ?? 0,
        longitude: source.longitude ?? 0,
      },
      endPoint: {
        latitude: destination.latitude ?? 0,
        longitude: destination.longitude ?? 0,
      },
      waypoints: autoGeoRoute,
    };
    if (searchParams.get('parent')) {
      policyData = {
        ...policyData,
        multiPolicyNumber: searchParams.get('parent') ?? '',
      };
    }
    createPolicyMutation.mutate(policyData);
  };

  const handleGeoData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGeoData({
      ...geoData,
      [e.target.name]: e.target.checked?.toString(),
    });
  };

  useEffect(() => {
    if (sideBar === 'risk') GeoRoute.refetch();
  }, [sideBar]);

  useEffect(() => {
    if (searchRef?.current) searchRef?.current?.focus();
  }, []);

  return (
    <div>
      {sideBar === 'risk' ? (
        <div className=" inset-0 w-full h-screen z-0 flex">
          <RiskGeoData
            handleCreatePolciy={handleCreatePolciy}
            handleGeoData={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleGeoData(e)
            }
            location={[sourceSearch, destinationSearch]}
            isCreating={createPolicyMutation.isLoading}
            isGeoFetched={
              automotiveSourceGeoData !== null &&
              automotiveDestinationGeoData !== null
            }
          />
          <AutoMotiveMapComponent
            location={source}
            sidbar={sideBar}
            draggable={false}
            source={source}
            destination={destination}
            setAutomotiveSourceGeoData={(data: MapGeoJSONFeature[]) =>
              setAutomotiveSourceGeoData(data)
            }
            setAutomotiveDestinationGeoData={(data: MapGeoJSONFeature[]) =>
              setAutomotiveDestinationGeoData(data)
            }
            route={autoGeoRoute}
            isRefetching={GeoRoute?.isRefetching}
          />
        </div>
      ) : (
        <div className=" inset-0 w-full h-screen z-0 flex">
          <div className="bg-white top-2 left-20 z-20 absolute mt-[30px] w-80 rounded-5">
            <div className="flex p-3 rounded-t-5 justify-between items-center w-full border-b border-gray-variant-2 h-12">
              <img src={Source} alt="source" className="mr-4" />
              <input
                ref={searchRef}
                value={sourceSearch}
                disabled={sourceMarker}
                onChange={(e) => {
                  setSourceSearch(e.target.value);
                  setApiError('');
                  setLocationType('Source');
                  !destinationMarker && setDestinationSearch('');
                }}
                onKeyDown={(e) => {
                  if (!searchMutation.isLoading && e.key === 'Enter')
                    searchMutation.mutate({ query: sourceSearch });
                }}
                className="z-20 relative flex-1 text-sm font-medium border-none focus:outline-none text-primary-gray  placeholder:text-[#8F8F8F] "
                placeholder="Choose starting point"
              />
              {sourceMarker ? (
                <img
                  src={Close}
                  alt="source clear"
                  className="mr-3 cursor-pointer"
                  onClick={() => {
                    setSourceSearch('');
                    setSourceMarker(false);
                  }}
                />
              ) : (
                <>
                  {!!sourceSearch.length && (
                    <div
                      className="flex items-center justify-center rounded-5 w-10 h-10 cursor-pointer"
                      onClick={() => {
                        if (!searchMutation.isLoading)
                          searchMutation.mutate({ query: sourceSearch });
                      }}
                    >
                      {locationType === 'Source' && searchMutation.isLoading ? (
                        <ClipLoader color="#4158D0" />
                      ) : (
                        <img
                          src={SearchImg}
                          alt="search"
                          height={12}
                          width={12}
                        />
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="bg-white p-3 flex border-none rounded-b-5 justify-between items-center w-full h-12">
              <img src={Destination} alt="source" className="mr-4" />
              <input
                ref={searchRefDest}
                value={destinationSearch}
                disabled={destinationMarker && !editDestination}
                onChange={(e) => {
                  setDestinationSearch(e.target.value);
                  setApiError('');
                  setLocationType('Destination');
                  !sourceMarker && setSourceSearch('');
                }}
                onKeyDown={(e) => {
                  if (!searchMutation.isLoading && e.key === 'Enter')
                    searchMutation.mutate({ query: destinationSearch });
                }}
                className=" z-20 relative flex-1 text-sm font-medium border-none focus:outline-none text-primary-gray  placeholder:text-[#8F8F8F] "
                placeholder="Choose Destination"
              />
              {destinationMarker && !editDestination ? (
                <img
                  src={Close}
                  alt="destination"
                  className="mr-3 cursor-pointer"
                  onClick={() => {
                    setEditDestination(true);
                    setDestinationSearch('');
                    setDestinationMarker(false);
                  }}
                />
              ) : (
                <>
                  {!!destinationSearch.length && (
                    <div
                      className="flex items-center justify-center rounded-5 w-10 h-10 cursor-pointer"
                      onClick={() => {
                        if (!searchMutation.isLoading)
                          searchMutation.mutate({ query: destinationSearch });
                      }}
                    >
                      {locationType === 'Destination' ? (
                        <>
                          {searchMutation.isLoading ? (
                            <>
                              <ClipLoader color="#4158D0" />
                            </>
                          ) : (
                            <>
                              <img
                                src={SearchImg}
                                alt="search"
                                height={12}
                                width={12}
                              />
                            </>
                          )}
                        </>
                      ) : null}
                    </div>
                  )}
                </>
              )}
            </div>

            {apiError.length > 0 ? (
              <p className=" absolute top-[100px] z-50 font-medium border-solid border-[#E8E8E8] left-0 py-4 px-3 w-full bg-white text-[#F21E1E] text-sm">
                {apiError}
              </p>
            ) : null}
          </div>
          <AutoMotiveMapComponent
            source={source}
            destination={destination}
            markerType={markerType}
            setSideBar={() => {
              setSideBar('risk');
            }}
            sidbar={sideBar}
            draggable
            zoom={zoom}
            setZoom={(value: number) => setZoom(value)}
            sourceMarker={sourceMarker}
            destinationMarker={destinationMarker}
            location={center}
            setSourceSearch={(value: string) => setSourceSearch(value)}
            setDestinationSearch={(value: string) =>
              setDestinationSearch(value)
            }
            setSourceCoordinates={(longitude: number, latitude: number) =>
              setSource({ longitude, latitude })
            }
            setDestinationCoordinates={(longitude: number, latitude: number) =>
              setDestination({ longitude, latitude })
            }
            sourceSearch={sourceSearch}
            destinationSearch={destinationSearch}
            locationCoordinates={{ source, destination }}
          />
        </div>
      )}
    </div>
  );
};

export default CreateSingleAutomotiveInsurance;
