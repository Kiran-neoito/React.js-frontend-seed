import { useState } from 'react';
import { CREATE_HOME_INSURANCE } from '../../../common/urlConstants';
import { Link } from 'react-router-dom';
import InsuranceList from './InsuranceList';
import DeletePolicyModal from '@/components/DeletePolicyModal';
import Pagination from '@/components/Pagination/Pagination';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteHomeInsurances } from '@/services/apis/home-insurance';
import { HomeInsuranceData } from '@/Types/homeInsurance';
import { AxiosResponse } from 'axios';
import { FilterAuto } from '@/Types/autoMotive';
import Search from '@/components/Search/Search';
import { PuffLoader } from 'react-spinners';

interface InsurancesProps {
  handleInsuranceTypes: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  insuranceTypes: string[];
  setPage: (page: number) => void;
  setSearchTerm: (value: string) => void;
  page: number;
  searchTerm: string;
  data: AxiosResponse | undefined;
  isLoading: boolean;
  filterValues: FilterAuto;
  setFilterValues: (values: FilterAuto) => void;
}

const Insurances = ({
  handleInsuranceTypes,
  insuranceTypes,
  page,
  searchTerm,
  setPage,
  setSearchTerm,
  data,
  isLoading,
  filterValues,
  setFilterValues,
}: InsurancesProps) => {
  const queryClient = useQueryClient();
  const [showDelete, setShowDelete] = useState<string>('');

  const policyData: HomeInsuranceData = data?.data?.data;

  const { mutate } = useMutation({
    mutationFn: deleteHomeInsurances,
    onSuccess: () => {
      //eslint-disable-next-line no-unsafe-optional-chaining
      const { nextPage, totalCount } = data?.data.data;
      if (!nextPage && page !== 1 && totalCount === (page - 1) * 10 + 1)
        setPage(page - 1);
      queryClient.invalidateQueries({ queryKey: ['home-insr'] });
    },
  });

  const filterApplied: boolean =
    !!filterValues.createdAtGte.length || !!filterValues.createdAtLte.length;

  return (
    <div className="w-full h-screen bg-white flex flex-col px-16">
      {!!showDelete.length && (
        <DeletePolicyModal
          onDelete={mutate}
          onClose={() => setShowDelete('')}
          id={showDelete}
        />
      )}
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <PuffLoader color="#415D80" size={100} />
        </div>
      ) : (
        <div className="relative h-screen flex flex-col">
          <div className="flex justify-end pt-3">
            <Link
              to={CREATE_HOME_INSURANCE}
              className="bg-[#2356F6] text-[14px] rounded-[6px] text-white px-[12px] py-[8px] font-medium"
            >
              Create New
            </Link>
          </div>
          <div className="my-5 flex flex-1 flex-col w-full overflow-y-auto">
            <p className="text-[20px] font-medium">List of Home Insurances</p>
            <Search
              filterValues={filterValues}
              setFilterValues={(values) => {
                setPage(1);
                setFilterValues(values);
              }}
              setSearchTerm={(term) => {
                setSearchTerm(term);
                setPage(1);
              }}
              searchTerm={searchTerm}
              insuranceType="HI"
            />
            <div className="flex-1 max-h-[calc(100vh-240px)] overflow-auto pr-3">
              {(!!searchTerm.length || filterApplied) && (
                <p className="font-medium text-base mt-5 mb-3">
                  Showing{' '}
                  <span className="underline">
                    {policyData?.totalCount} policies
                  </span>{' '}
                </p>
              )}
              <div className="flex-1 overflow-y-auto pr-3">
                {policyData?.data?.map((insurance) => (
                  <InsuranceList
                    handleInsuranceTypes={handleInsuranceTypes}
                    insuranceTypes={insuranceTypes}
                    insurance={insurance}
                    key={insurance.id}
                    onDelete={setShowDelete}
                  />
                ))}
              </div>
            </div>
          </div>
          {policyData?.totalPages <= 1 ? null : (
            <div className="w-full bg-white flex justify-end">
              <Pagination
                page={page}
                totalPages={policyData?.totalPages}
                nextPage={() => setPage(page + 1)}
                previousPage={() => setPage(page - 1)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Insurances;
