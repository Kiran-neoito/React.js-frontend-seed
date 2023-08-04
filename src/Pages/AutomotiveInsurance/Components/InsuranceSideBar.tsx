import { useState } from 'react';
import DeletePolicyModal from '@/components/DeletePolicyModal';
import { Link } from 'react-router-dom';
import {
  AUTOMOTIVE_INSURANCE,
  CREATE_AUTOMOTIVE_INSURANCE_SINGLE,
} from '@/common/urlConstants';
import { AxiosResponse } from 'axios';
import { AutoInsuranceData, FilterAuto } from '@/Types/autoMotive';
import InsuranceList from './InsuranceList';
import Pagination from '@/components/Pagination/Pagination';
import { Add, WhiteArrow } from '@/assets/images';
import CreateMultiAutomotiveInsurance from '@/Pages/CreateMultiAutomotiveInsurance/CreateMultiAutomotiveInsurance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteAutomotiveInsurance,
  getMasterPolicy,
} from '@/services/apis/automotive-insurance';
import MasterPolicy from './MasterPolicy';
import Search from '@/components/Search/Search';
import { PuffLoader } from 'react-spinners';

type AutomotiveInsuranceProps = {
  handleInsuranceTypes: (id: string, type?: string) => void;
  insuranceTypes: string[];
  setPage: (page: number) => void;
  setSearchTerm: (value: string) => void;
  page: number;
  searchTerm: string;
  data: AxiosResponse | undefined;
  isLoading: boolean;
  filterValues: FilterAuto;
  setFilterValues: (values: FilterAuto) => void;
  policySelected?: string;
};

const AutomotiveInsuranceSidebar: React.FC<AutomotiveInsuranceProps> = ({
  setPage,
  setSearchTerm,
  searchTerm,
  data,
  page,
  isLoading,
  insuranceTypes,
  handleInsuranceTypes,
  filterValues,
  setFilterValues,
  policySelected,
}) => {
  const queryClient = useQueryClient();
  const [showDelete, setShowDelete] = useState<string>('');
  const [showCreate, setShowCreate] = useState<boolean>(false);

  const createMain = () => {
    setShowCreate(true);
  };

  const { mutate } = useMutation({
    mutationFn: deleteAutomotiveInsurance,
    onSuccess: () => {
      //eslint-disable-next-line no-unsafe-optional-chaining
      const { nextPage, totalCount } = data?.data?.data;
      if (!nextPage && page !== 1 && totalCount === (page - 1) * 10 + 1)
        setPage(page - 1);
      queryClient.invalidateQueries({ queryKey: ['auto-insr'] });
    },
  });

  const { data: masterPolicy } = useQuery({
    enabled: !!policySelected?.length,
    queryKey: ['auto-insr', 'multi', policySelected],
    keepPreviousData: true,
    queryFn: () => getMasterPolicy(policySelected ?? ''),
  });

  const policyData: AutoInsuranceData = data?.data?.data;

  const filterApplied: boolean =
    !!filterValues.createdAtGte.length ||
    !!filterValues.createdAtLte.length ||
    !!filterValues.type?.length;
  return (
    <div className="w-full h-screen bg-white flex flex-col px-16">
      {!!showDelete.length && (
        <DeletePolicyModal
          onDelete={mutate}
          onClose={() => setShowDelete('')}
          id={showDelete}
        />
      )}
      {showCreate && (
        <CreateMultiAutomotiveInsurance onClose={() => setShowCreate(false)} />
      )}
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <PuffLoader color="#415D80" size={100} />
        </div>
      ) : (
        <div className="relative h-screen flex flex-col">
          {!policySelected ? (
            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={createMain}
                className="bg-main-blue text-sm rounded-md text-white px-3 py-2 font-medium flex gap-2 items-center"
              >
                <img src={Add} alt="add" />
                <span>Multi Route Insurance</span>
              </button>
              <Link
                to={CREATE_AUTOMOTIVE_INSURANCE_SINGLE}
                className="bg-main-blue text-sm rounded-md text-white px-3 py-2 font-medium flex gap-2"
              >
                <img src={Add} alt="add" />
                <span>Single Route Insurance</span>
              </Link>
            </div>
          ) : (
            <div className="flex pt-3">
              <Link
                to={AUTOMOTIVE_INSURANCE}
                className="bg-main-blue rounded-md text-white px-2 py-2 font-normal flex gap-1 text-xs"
              >
                <img src={WhiteArrow} alt="back" className="rotate-180" />
                <span>Back To All Policies</span>
              </Link>
            </div>
          )}
          <div className="my-5 flex flex-1 flex-col w-full overflow-y-auto">
            <p className="text-xl font-medium">
              {policySelected
                ? `List of Sub Policies Under ${policySelected}`
                : 'List of Automotive Insurances'}
            </p>
            <Search
              filterValues={filterValues}
              setFilterValues={(values) => {
                setPage(1);
                setFilterValues(values);
              }}
              searchTerm={searchTerm}
              setSearchTerm={(term) => {
                setPage(1);
                setSearchTerm(term);
              }}
              showType={!policySelected?.length}
              insuranceType="AI"
            />
            {policySelected ? (
              <MasterPolicy insurance={masterPolicy?.data.data} />
            ) : null}
            {(!!searchTerm.length || policySelected || filterApplied) && (
              <p className="font-medium text-base my-6">
                Showing{' '}
                <span className="underline">
                  {policyData?.totalCount} policies
                </span>
              </p>
            )}
            <div className="flex-1 overflow-y-auto pr-3">
              {policyData?.data?.map((insurance) => (
                <InsuranceList
                  handleInsuranceTypes={handleInsuranceTypes}
                  insuranceTypes={insuranceTypes}
                  insurance={insurance}
                  key={insurance.policy_number}
                  onDelete={setShowDelete}
                  policySelected={policySelected}
                />
              ))}
            </div>
          </div>
          {policyData?.totalPages > 1 ? (
            <div className="w-full bg-white flex justify-end">
              <Pagination
                page={page}
                totalPages={policyData?.totalPages}
                nextPage={() => setPage(page + 1)}
                previousPage={() => setPage(page - 1)}
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default AutomotiveInsuranceSidebar;
