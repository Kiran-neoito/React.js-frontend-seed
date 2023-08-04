import { EyeOpen, Delete, Download } from '@/assets/images';
import { InsurancesListAutoProps } from '@/Types/autoMotive';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AddSlim, ArrowRight } from '@/assets/images';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CREATE_AUTOMOTIVE_INSURANCE_SINGLE } from '@/common/urlConstants';
const InsuranceList = ({
  insurance,
  handleInsuranceTypes,
  insuranceTypes,
  onDelete,
  policySelected,
}: InsurancesListAutoProps) => {
  dayjs.extend(relativeTime);

  const [download, setDownload] = useState<string>('');
  const navigate = useNavigate();

  const setDownloadItem = (item: string) => {
    if (item === download) {
      setDownload('');
      return;
    }
    setDownload(item);
  };

  const isExpired = dayjs().isAfter(dayjs(insurance?.expiry));

  return (
    <div key={insurance.policy_number}>
      <div
        className="flex items-center cursor-pointer justify-between py-3 rounded"
        onClick={() => {
          if (insuranceTypes?.[0] !== insurance.policy_number)
            handleInsuranceTypes(insurance.policy_number, insurance.type);
        }}
      >
        <div className="form-check flex items-center">
          {/* {insurance.type === 'multi' ? (
            <button
              className="mr-4"
              onClick={() =>
                handleInsuranceTypes(insurance.policy_number, insurance.type)
              }
            >
              <img
                src={ArrowRight}
                alt="open"
                className={`h-3.5 ${
                  insuranceTypes?.[0] === insurance.policy_number &&
                  insurance.type === 'multi'
                    ? 'rotate-90'
                    : ''
                }`}
              />
            </button>
          ) : null} */}
          <div>
            <label
              className={`cursor-pointer form-check-label  inline-block text-gray-800 ${
                policySelected ? 'w-[280px]' : 'w-64'
              }`}
              htmlFor={insurance.policy_number}
            >
              <p
                className={`text-base font-medium mt-2 cursor-pointer ${
                  insuranceTypes?.includes(insurance.policy_number)
                    ? 'underline decoration-[#4158D0] text-[#4158D0]'
                    : ''
                }`}
              >
                {insurance.policy_number}
              </p>
            </label>
            <p className="text-xs opacity-40">
              Created {dayjs(insurance.created_at).fromNow()}
            </p>
          </div>
          <div className="flex items-center">
            {insurance.type === 'single' ? (
              <p className="ml-6 text-sm bg-green-600 font-medium h-8 pt-[5px] px-2 text-white rounded">
                {insurance.risk_score || 0}
              </p>
            ) : null}
            {dayjs().diff(dayjs(insurance.created_at), 'minute') <= 1 ? (
              <div className="flex items-center justify-center ml-3 bg-[#F3DBBF] text-[#E69A41] py-1 px-2 rounded-3xl font-bold text-xs whitespace-nowrap">
                New Report
              </div>
            ) : null}
          </div>
        </div>
        {insurance.type === 'multi' ? (
          <div className="flex gap-3.5 items-center">
            <button
              className={`rounded-md flex justify-center items-center w-8 h-8 ${
                isExpired ? 'bg-gray-variant-3' : 'bg-main-blue'
              }`}
              disabled={isExpired}
              onClick={(e) => {
                e.stopPropagation();
                navigate(
                  `${CREATE_AUTOMOTIVE_INSURANCE_SINGLE}?parent=${insurance.policy_number}`
                );
              }}
            >
              <img src={AddSlim} alt="add" className="w.3.5 h-3.5" />
            </button>
            <button
              onClick={() =>
                handleInsuranceTypes(insurance.policy_number, insurance.type)
              }
            >
              <img src={ArrowRight} alt="open" className="h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex gap-2.5 items-center">
            <div className="hi-list-icon">
              <img src={EyeOpen} alt="view" />
            </div>
            <div className="hi-list-icon relative">
              <img
                src={Download}
                alt="download"
                onClick={(e) => {
                  e.stopPropagation();
                  setDownloadItem(insurance.policy_number);
                }}
              />
              {download === insurance.policy_number ? (
                <div className="absolute top-full -right-10 mt-4 pt-5 px-4 bg-white drop-shadow-md">
                  <span className="text-primary-gray text-xs font-medium">
                    Download Report As
                  </span>
                  <button className="line-button">
                    Portable Document Format (PDF)
                  </button>
                  <button className="line-button">
                    Comma Seperated Values (CSV)
                  </button>
                </div>
              ) : null}
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
        )}
      </div>
    </div>
  );
};

export default InsuranceList;
