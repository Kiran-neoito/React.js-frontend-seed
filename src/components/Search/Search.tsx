import { FilterImg, FilterWhite } from '@/assets/images';
import useOnClickOutside from '@/hooks/useClickOutside';
import { FilterAuto } from '@/Types/autoMotive';
import { useRef, useState } from 'react';
import FilterMultiAutomotiveInsurance from '../FilterInsurance/FilterInsurance';

type Props = {
  filterValues: FilterAuto;
  setFilterValues: (values: FilterAuto) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  showType?: boolean;
  insuranceType: string;
};

const Search: React.FC<Props> = ({
  filterValues,
  setFilterValues,
  showType = false,
  setSearchTerm,
  searchTerm,
  insuranceType,
}) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const openFilter = () => setShowFilter((pre) => !pre);

  const clearFilter = () => {
    setFilterValues({
      createdAtGte: '',
      createdAtLte: '',
      type: '',
    });
    setShowFilter(false);
  };

  const filterInsr = (data: FilterAuto) => {
    setFilterValues(data);
    setShowFilter(false);
  };

  const searchHandler = () => {
    if (searchRef.current?.value) setSearchTerm(searchRef.current?.value);
  };

  const searchEmptyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.length && searchTerm.length) setSearchTerm('');
  };

  useOnClickOutside(filterRef, () => setShowFilter(false));
  return (
    <div className="relative my-5 border-2 border-opacity-40 border-solid border-main-blue px-2.5 h-14 rounded-lg flex items-center gap-3">
      <input
        className="text-base font-medium border-none focus:outline-none flex-1"
        placeholder={`DDMMYY-${insuranceType}-LOC-SH-00000${
          insuranceType === 'AI' && !showType ? '-00000' : ''
        }`}
        ref={searchRef}
        onChange={searchEmptyHandler}
      />
      <div ref={filterRef}>
        <button
          className={`h-8 w-8 flex justify-center items-center rounded-md ${
            showFilter ||
            filterValues?.createdAtGte ||
            filterValues?.createdAtLte ||
            filterValues?.type
              ? 'bg-primary'
              : 'bg-gray-variant-3'
          }`}
          onClick={openFilter}
        >
          <img
            src={
              showFilter ||
              filterValues?.createdAtGte ||
              filterValues?.createdAtLte ||
              filterValues?.type
                ? FilterWhite
                : FilterImg
            }
            alt="calendar"
          />
        </button>
        {showFilter ? (
          <div className="absolute top-full right-0 mt-1 z-10">
            <FilterMultiAutomotiveInsurance
              filterValues={filterValues}
              onClear={() => clearFilter()}
              onFilter={filterInsr}
              showType={showType}
            />
          </div>
        ) : null}
      </div>
      <button
        className="bg-primary-gray h-8 flex justify-center items-center px-5 text-white rounded-md"
        onClick={searchHandler}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
