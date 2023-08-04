import { ArrowRight } from '@/assets/images';
import { dateToISO, ofTime } from '@/helpers/utils';
import { getHomeInsurances } from '@/services/apis/home-insurance';
import { GetInsuranceParams } from '@/services/types/automotive-insurance';
import { FilterAuto } from '@/Types/autoMotive';
import { HomeInsuranceData } from '@/Types/homeInsurance';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import MapComponent from '../../components/Map/MapComponent';
import Insurances from './Components/Insurance';

const HomeInsurance = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [polygonCoordinates, setPolygonCoordinates] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [insuranceTypes, setInsuranceTypes] = useState<string[]>([]);
  const [homePolicies, setHomePolicies] = useState<HomeInsuranceData>();
  const [homePolicyFetch, setHomePolicyFetch] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<string>('');
  const [filterValues, setFilterValues] = useState<FilterAuto>({
    createdAtGte: '',
    createdAtLte: '',
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      'home-insr',
      page,
      searchTerm,
      filterValues,
      polygonCoordinates != '' && polygonCoordinates,
    ],
    keepPreviousData: true,
    queryFn: () => {
      let args: GetInsuranceParams = {
        page,
        limit: 10,
        search: searchTerm,
        polygon: polygonCoordinates,
      };
      if (filterValues.createdAtGte.length) {
        const createdAtGte = dateToISO(filterValues.createdAtGte);
        args = {
          ...args,
          createdAtGte: ofTime(createdAtGte, true),
        };
      }
      if (filterValues.createdAtLte.length) {
        const createdAtLte = dateToISO(filterValues.createdAtLte);
        args = {
          ...args,
          createdAtLte: ofTime(createdAtLte, false),
        };
      }
      return getHomeInsurances(args);
    },
  });

  useEffect(() => {
    if (data && polygonCoordinates === '' && filterType != 'polygon') {
      setHomePolicies(data?.data.data);
    }
  }, [data, homePolicyFetch]);

  const handleInsuranceTypes = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (e.target.checked) {
      setInsuranceTypes([...insuranceTypes, id]);
    } else {
      setInsuranceTypes(
        insuranceTypes.filter(function (e) {
          return e != id;
        })
      );
    }
  };

  const [showList, setShowSide] = useState(true);

  return (
    <div className=" inset-0 w-full h-screen z-0 flex">
      <div
        className={`fixed top-0 left-14 h-screen z-10 ${
          showList ? 'w-[46.5%] max-w-3xl min-w-[520px]' : 'w-0 max-w-0'
        }`}
      >
        <div className="w-full">
          <div
            onClick={() => setShowSide(!showList)}
            className={`absolute -right-3 top-1/2 w-6 h-12 -mt-6 flex items-center justify-center rounded-[32px] z-10 cursor-pointer ${
              showList ? 'bg-gray-variant-1' : 'bg-white'
            }`}
          >
            <img
              src={ArrowRight}
              alt="arrow"
              className={showList ? 'rotate-180' : 'rotate-0'}
            />
          </div>
          {showList ? (
            <Insurances
              handleInsuranceTypes={handleInsuranceTypes}
              insuranceTypes={insuranceTypes}
              setPage={(page: number) => setPage(page)}
              setSearchTerm={(value: string) => setSearchTerm(value)}
              page={page}
              searchTerm={searchTerm}
              data={data}
              isLoading={isLoading}
              filterValues={filterValues}
              setFilterValues={(values: FilterAuto) => setFilterValues(values)}
            />
          ) : null}
        </div>
      </div>
      <MapComponent
        tileSelectionEnable
        gridEnable
        insuranceTypes={insuranceTypes}
        insurances={homePolicies}
        sidbar="Home"
        setPolygonCoordinates={(data: string) => setPolygonCoordinates(data)}
        polygonCoordinates={polygonCoordinates}
        refetch={refetch}
        setHomePolicyFetch={() => setHomePolicyFetch(false)}
        setFilterType={(value: string) => setFilterType(value)}
      />
    </div>
  );
};

export default HomeInsurance;
