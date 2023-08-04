import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import AutomotiveInsuranceSidebar from './Components/InsuranceSideBar';
import {
  getAutomotiveInsurance,
  getAutomotiveInsurances,
} from '@/services/apis/automotive-insurance';
import AutoMotiveMapComponent from '@/components/Map/AutoMotiveMapComponent';
import { FilterAuto } from '@/Types/autoMotive';
import { GetInsuranceParams } from '@/services/types/automotive-insurance';
import { dateToISO, ofTime } from '@/helpers/utils';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from '@/assets/images';

const AutomotiveInsurance = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [zoom, setZoom] = useState(15);
  const [page, setPage] = useState<number>(1);
  const [insuranceTypes, setInsuranceTypes] = useState<string[]>([]);
  const [policyNumber, setPolicyNumber] = useState<string>('');
  const [filterValues, setFilterValues] = useState<FilterAuto>({
    createdAtGte: '',
    createdAtLte: '',
    type: '',
  });
  const navigate = useNavigate();

  const AutomotiveInsurances = useQuery({
    queryKey: ['auto-insr', page, searchTerm, filterValues],
    keepPreviousData: true,
    queryFn: () => {
      let args: GetInsuranceParams = {
        page,
        limit: 10,
        search: searchTerm,
        type: filterValues.type,
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
      return getAutomotiveInsurances(args);
    },
  });

  const { data } = useQuery({
    enabled: policyNumber !== '',
    queryKey: ['auto-insr', policyNumber],
    queryFn: () => getAutomotiveInsurance(policyNumber),
  });

  const handleInsuranceTypes = (id: string, type?: string) => {
    setInsuranceTypes([id]);
    setPolicyNumber(id);
    if (type === 'multi') {
      navigate(`/automotive-insurance/${id}`);
    }
  };

  const getListingRoutes = () => {
    const arr = data?.data?.data?.waypoints.map((str: string) => [str]);
    return arr;
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
            <AutomotiveInsuranceSidebar
              handleInsuranceTypes={handleInsuranceTypes}
              insuranceTypes={insuranceTypes}
              setPage={(page: number) => setPage(page)}
              setSearchTerm={(value: string) => setSearchTerm(value)}
              page={page}
              searchTerm={searchTerm}
              data={AutomotiveInsurances?.data}
              isLoading={AutomotiveInsurances?.isLoading}
              filterValues={filterValues}
              setFilterValues={(values: FilterAuto) => setFilterValues(values)}
            />
          ) : null}
        </div>
      </div>
      <AutoMotiveMapComponent
        tileSelectionEnable
        gridEnable
        // insuranceTypes={insuranceTypes}
        insurances={data?.data?.data}
        zoom={zoom}
        setZoom={(value: number) => setZoom(value)}
        sidbar="single-automotive"
        listingRoute={getListingRoutes()}
      />
    </div>
  );
};

export default AutomotiveInsurance;
