import { EyeOpen, Delete, Download } from '@/assets/images';
import { InsurancesListProps } from '@/Types/homeInsurance';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const InsuranceList = ({
  insurance,
  insuranceTypes,
  onDelete,
}: InsurancesListProps) => {
  dayjs.extend(relativeTime);
  return (
    <div
      key={insurance.id}
      className={`flex items-center  justify-between py-3 rounded  ${
        insuranceTypes?.includes(insurance.policy_number)
          ? 'bg-[#F6F6F6]'
          : 'bg-white'
      }`}
    >
      <div className="form-check flex items-center">
        <div className="form-check-label  inline-block text-gray-800 w-64">
          <p className="text-base font-medium mt-2">
            {insurance.policy_number}
          </p>
          <p className="text-xs opacity-40">
            Created {dayjs(insurance.updated_at).fromNow()}
          </p>
        </div>
        <p className="ml-6 text-sm bg-green-600 font-medium h-8 pt-[5px] px-2 text-white rounded">
          {insurance.risk_score}
        </p>
        {dayjs().diff(dayjs(insurance.created_at), 'minute') <= 1 ? (
          <div className="flex items-center justify-center ml-3 bg-[#F3DBBF] text-[#E69A41] py-1 px-2 rounded-3xl font-bold text-xs whitespace-nowrap">
            New Report
          </div>
        ) : null}
      </div>
      <div className="flex gap-2.5 items-center">
        <div className="hi-list-icon">
          <img src={EyeOpen} alt="view" />
        </div>
        <div className="hi-list-icon" onClick={(e) => e.stopPropagation()}>
          <img src={Download} alt="download" />
        </div>
        <div
          className="hi-list-icon"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(insurance.policy_number);
          }}
        >
          <img src={Delete} alt="delete" />
        </div>
      </div>
    </div>
  );
};

export default InsuranceList;
