import MapComponent from '../../components/Map/MapComponent';
import { MapGeoJSONFeature } from 'maplibre-gl';
import { useEffect, useRef, useState } from 'react';
import RiskGeoData from '../HomeInsurance/Components/RiskGeoData';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createPolicy } from '@/services/apis/home-insurance';
import {
  searchLocation,
  getLocationFromCoordinates,
} from '@/services/apis/geoCoding';
import { AxiosResponse } from 'axios';
// import Spinner from '@/components/Loader/SuspenseLoader';
import { useNavigate } from 'react-router-dom';
import { SearchImg } from '@/assets/images';
import { ClipLoader } from 'react-spinners';

export interface riskProps {
  location: string;
  Flooding: string[];
  fireStation: string;
  policeStation: string;
  Climate: string[];
  D_Zone: string[];
  locationInfo?: { lat: null | number; long: null | number };
  Roof_Type: string;
  Roof_Visual: string;
  Building_Size: string;
  Construction_Year: string;
}

const CreateHomeInsurance = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [sideBar, setSideBar] = useState('Insurance');
  const [locationData, setLocationData] = useState<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AxiosResponse<any, any> | undefined
  >(undefined);
  const [markerType, setMarkerType] = useState('');
  const [markerSelection, setMarkerSelection] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [region, setRegion] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [locationID, setLocationID] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();
  const [homeGeoData, setHomeGeoData] = useState<MapGeoJSONFeature[] | null>(
    null
  );
  const [geoData, setGeoData] = useState<riskProps>({
    location: 'false',
    Flooding: [],
    fireStation: 'false',
    policeStation: 'false',
    Climate: [],
    D_Zone: [],
    Roof_Type: 'false',
    Roof_Visual: 'false',
    Building_Size: 'false',
    Construction_Year: 'false',
  });

  const [location, setLocation] = useState<{
    lat: null | number;
    long: null | number;
  }>({ long: null, lat: null });

  const [coordinates, setCoordinates] = useState<{
    lat: number | null;
    long: number | null;
  }>({ long: null, lat: null });

  const { data, refetch } = useQuery({
    enabled: false,
    queryKey: ['geo-reverse'],
    keepPreviousData: true,
    onSuccess: (e) => {
      setLocationData(e);
    },
    queryFn: () =>
      getLocationFromCoordinates({
        longitude: coordinates.long ?? 0,
        latitude: coordinates.lat ?? 0,
      }),
  });

  useEffect(() => {
    setLocationData(undefined);
  }, []);

  const searchMutation = useMutation({
    mutationFn: searchLocation,
    onSuccess: (res: AxiosResponse) => {
      if (res.data?.message === 'No results found') {
        setApiError(res.data?.message);
      } else {
        const { address, coordinates, locationId, name } = res.data.data;
        const { countryCode, streetAddress } = address;
        countryCode && setCountryCode(countryCode);
        name && setRegion(name);
        streetAddress && setStreetAddress(streetAddress);

        locationId && setLocationID(locationId);

        if (coordinates && Object.keys(coordinates)) {
          setLocation({
            lat: coordinates.latitude,
            long: coordinates.longitude,
          });
          setCoordinates({
            lat: coordinates.latitude,
            long: coordinates.longitude,
          });
        }
      }
    },
    // onError: (err: AxiosError<{ message: string }>) => {
    //   if (err.response?.data?.message) console.log(err.response.data.message);
    // },
  });

  const createPolicyMutation = useMutation({
    mutationFn: createPolicy,
    onSuccess: () => {
      navigate('/home-insurance');
    },
    // onError: (err: AxiosError<{ message: string }>) => {
    //   if (err.response?.data?.message) console.log(err.response.data.message);
    // },
  });

  const AddGeoData = (data: string, type: string) => {
    if (type === 'flood') {
      setGeoData({ ...geoData, Flooding: [...geoData.Flooding, data] });
    } else if (type === 'climate') {
      setGeoData({ ...geoData, Climate: [...geoData.Climate, data] });
    } else if (type === 'dzone') {
      setGeoData({ ...geoData, D_Zone: [...geoData.D_Zone, data] });
    }
  };

  const removeGeoData = (data: string, type: string) => {
    if (type === 'flood') {
      setGeoData({
        ...geoData,
        Flooding: geoData.Flooding.filter((e) => e != data),
      });
    } else if (type === 'climate') {
      setGeoData({
        ...geoData,
        Climate: geoData.Climate.filter((e) => e != data),
      });
    } else if (type === 'dzone') {
      setGeoData({
        ...geoData,
        D_Zone: geoData.D_Zone.filter((e) => e != data),
      });
    }
  };

  const handleCreatePolciy = () => {
    if (location.lat && location?.long) {
      const policyData = {
        geoData: { home: homeGeoData },
        country: countryCode || 'NA',
        latitude: location.lat,
        longitude: location.long,
      };
      createPolicyMutation.mutate(policyData);
    }
  };

  useEffect(() => {
    if (coordinates.long != null && coordinates?.lat != null) {
      setLocation({ long: coordinates.long, lat: coordinates.lat });
      setCoordinates({ long: coordinates.long, lat: coordinates.lat });
      refetch();
    }
  }, [sideBar]);

  useEffect(() => {
    if (searchRef?.current) searchRef?.current?.focus();
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !!searchVal.length) {
      searchMutation.mutate({ query: searchVal });
      setMarkerType('location');
    }
  };

  return (
    <div>
      {sideBar === 'risk' ? (
        <div className=" inset-0 w-full h-screen z-0 flex">
          <RiskGeoData
            geoData={geoData}
            setGeoData={(e: riskProps) => setGeoData(e)}
            AddGeoData={(data: string, type: string) => AddGeoData(data, type)}
            removeGeoData={(data: string, type: string) =>
              removeGeoData(data, type)
            }
            handleCreatePolciy={handleCreatePolciy}
            address={data}
            isCreating={createPolicyMutation.isLoading}
            isFeatureFetched={homeGeoData !== null}
          />
          <MapComponent
            tileSelectionEnable
            gridEnable
            location={location}
            sidbar={sideBar}
            address={locationData}
            markerType={markerType}
            setHomeGeoData={(data: MapGeoJSONFeature[]) => setHomeGeoData(data)}
          />
        </div>
      ) : (
        <div className=" inset-0 w-full h-screen z-0 flex">
          <div className="bg-white flex top-2 pl-2 left-20 z-20 absolute mt-[30px] w-[300px]  border-none   rounded-[5px]  ">
            <input
              ref={searchRef}
              value={searchVal}
              onKeyDown={(e) => handleKeyPress(e)}
              onChange={(e) => {
                setSearchVal(e.target.value);
                setApiError('');
              }}
              className=" pl-2  z-20 relative p-[14px] w-[250px] text-[14px] font-medium border-none focus:outline-none text-[#666666]  placeholder:text-[#8F8F8F] "
              placeholder="Search for address"
            />
            {!!searchVal.length && (
              <div
                className="flex items-center justify-center mr-3 cursor-pointer"
                onClick={() => {
                  searchMutation.mutate({ query: searchVal });
                  setMarkerType('location');
                }}
              >
                {searchMutation?.isLoading ? (
                  <ClipLoader color="#4158D0" />
                ) : (
                  <img src={SearchImg} alt="add" />
                )}
              </div>
            )}
          </div>
          {apiError.length > 0 ? (
            <p className="z-20 absolute top-[88px] font-medium border-solid border-[#E8E8E8] left-20 pl-4 py-4 px-3 w-[300px] bg-white text-[#F21E1E] text-sm">
              {apiError}
            </p>
          ) : null}

          <MapComponent
            gridEnable
            location={location}
            markerType={markerType}
            setSideBar={() => {
              setSideBar('risk');
              refetch();
            }}
            sidbar={sideBar}
            draggable={true}
            coordinates={coordinates}
            setCoordinates={(long: number, lat: number) =>
              setCoordinates({ long, lat })
            }
            setMarkerType={(type: string) => setMarkerType(type)}
            address={data}
            markerSelection={markerSelection}
            setMarkerSelection={() => setMarkerSelection((prev) => !prev)}
            locationDetails={{ locationID, streetAddress, region, countryCode }}
            refetch={() => refetch()}
          />

          {/* {searchMutation.isLoading && <Spinner />} */}
          {/* {createPolicyMutation.isLoading && <Spinner />} */}
        </div>
      )}
    </div>
  );
};

export default CreateHomeInsurance;
