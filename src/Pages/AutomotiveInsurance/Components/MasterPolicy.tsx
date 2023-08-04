import { AutoInsurance } from '@/Types/autoMotive';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AddSlim } from '@/assets/images';
import { useNavigate } from 'react-router-dom';
import { CREATE_AUTOMOTIVE_INSURANCE_SINGLE } from '@/common/urlConstants';
const MasterPolicy: React.FC<{ insurance: AutoInsurance }> = ({
  insurance,
}) => {
  dayjs.extend(relativeTime);
  const navigate = useNavigate();
  const isExpired = dayjs().isAfter(dayjs(insurance?.expiry));

  return (
    <div className="flex items-center cursor-pointer justify-between py-3 rounded-5 bg-[#F6F6F6] px-1">
      <div className="form-check flex items-center">
        <label
          className="form-check-label  inline-block text-gray-800 "
          htmlFor={insurance.policy_number}
        >
          <p className="text-base font-medium mt-2">
            {insurance.policy_number}
          </p>
          <p className="text-xs opacity-40">
            Created {dayjs(insurance.created_at).fromNow()}
          </p>
        </label>
      </div>
      <button
        className={`rounded-md flex justify-center items-center w-8 h-8 ${
          isExpired ? 'bg-gray-variant-3' : 'bg-main-blue'
        }`}
        disabled={isExpired}
        onClick={() => {
          navigate(
            `${CREATE_AUTOMOTIVE_INSURANCE_SINGLE}?parent=${insurance.policy_number}`
          );
        }}
      >
        <img src={AddSlim} alt="add" className="w.3.5 h-3.5" />
      </button>
    </div>
  );
};

export default MasterPolicy;
