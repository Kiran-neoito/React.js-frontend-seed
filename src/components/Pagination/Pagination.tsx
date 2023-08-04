import { PageArrow } from '@/assets/images';

type PaginationProps = {
  page: number;
  totalPages: number;
  nextPage: () => void;
  previousPage: () => void;
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  nextPage,
  previousPage,
  totalPages,
}) => {
  return (
    <div className="m-3 flex justify-end gap-2">
      {page == 1 ? null : (
        <div
          className="pagination-tile transform rotate-180 cursor-pointer"
          onClick={previousPage}
        >
          <img src={PageArrow} alt="previous" />
        </div>
      )}
      <div className="pagination-tile">{page}</div>
      <div
        className={`pagination-tile cursor-pointer ${
          totalPages === page ? ' invisible ' : ''
        }`}
        onClick={nextPage}
      >
        <img src={PageArrow} alt="next" />
      </div>
    </div>
  );
};

export default Pagination;
