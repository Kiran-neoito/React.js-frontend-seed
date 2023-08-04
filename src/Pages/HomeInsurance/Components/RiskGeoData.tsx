import { Arrow, Home } from '../../../assets/images';
import React, { useState } from 'react';
import RiskSubMenu from './RiskSubMenu';
import {
  CLIMATE_SUB_MENU,
  DZONE_SUB_MENU,
  FLOOD_SUB_MENU,
} from '../../../common/utility/home-insurance';
import { riskProps } from '@/Pages/CreateHomeInsurance/CreateHomeInsurance';
import { AxiosResponse } from 'axios';

interface riskGeoProps {
  geoData: riskProps;
  setGeoData: (e: riskProps) => void;
  AddGeoData: (data: string, type: string) => void;
  removeGeoData: (data: string, type: string) => void;
  handleCreatePolciy: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  address?: AxiosResponse<any, any> | undefined;
  isCreating: boolean;
  isFeatureFetched: boolean;
}

const RiskGeoData: React.FC<riskGeoProps> = ({
  AddGeoData,
  geoData,
  removeGeoData,
  setGeoData,
  handleCreatePolciy,
  address,
  isCreating,
  isFeatureFetched,
}) => {
  const [current, setCurrent] = useState<'Risk' | 'Geo'>('Risk');
  const [floodSubMenu, setFloodSubMenu] = useState<boolean>(false);
  const [climateSubMenu, setClimateSubMenu] = useState<boolean>(false);
  const [dzoneSubMenu, setDzoneSubMenu] = useState<boolean>(false);

  return (
    <div className="max-w-96 w-3/12 p-5 bg-white min-w-[368px] flex flex-col">
      <div className="w-full flex items-center py-3 px-2 border border-[#E6E7E8] rounded-md shadow mb-12 gap-3 h-12">
        <img src={Home} alt="adress" />
        <span className="font-medium text-sm text-[#666666] truncate">
          {address?.data?.data?.name}
        </span>
      </div>
      <div className="flex flex-col flex-1 overflow-auto justify-center gap-3 w-full">
        <div className="w-full flex items-center font-medium text-base cursor-pointer mb-2">
          <div
            className={`w-1/2 border-b flex items-center justify-center py-3 px-5 h-[52px] ${
              current === 'Risk'
                ? 'text-primary border-primary bg-[#F1F2F3]'
                : 'text-primary-gray border-primary-gray'
            }`}
            onClick={() => setCurrent('Risk')}
          >
            Risk Factors
          </div>
          <div
            className={`w-1/2 border-b flex items-center justify-center py-3 px-5 h-[52px] ${
              current === 'Geo'
                ? 'text-primary border-primary bg-[#F1F2F3]'
                : 'text-primary-gray border-primary-gray'
            }`}
            onClick={() => setCurrent('Geo')}
          >
            Geo Data
          </div>
        </div>
        <div className="flex flex-1 flex-col overflow-auto pr-3">
          <div className="flex items-center gap-1 py-3">
            <input
              type="checkbox"
              className="accent-primary-gray w-[17px] h-[17px]"
              id="location"
              onChange={(e) => {
                if (e.target.checked) {
                  setGeoData({ ...geoData, location: true.toString() });
                } else {
                  setGeoData({ ...geoData, location: false.toString() });
                }
              }}
            />
            <label htmlFor="location" className="font-medium text-primary-gray">
              Location
            </label>
          </div>
          <div className="w-full">
            <div
              className={`w-full flex items-center gap-2 py-3 ${
                floodSubMenu ? 'border-b border-primaryGray' : ''
              }`}
            >
              <img
                src={Arrow}
                alt="open submenu"
                className={`cursor-pointer ml-1 ${
                  floodSubMenu ? 'transform rotate-90' : ''
                }`}
                onClick={() => setFloodSubMenu((pre) => !pre)}
              />
              <label
                htmlFor="location"
                className="font-medium text-primary-gray"
              >
                Flooding
              </label>
            </div>
            {floodSubMenu ? (
              <RiskSubMenu
                items={FLOOD_SUB_MENU}
                geoData={geoData.Flooding}
                AddGeoData={(data: string) => AddGeoData(data, 'flood')}
                removeGeoData={(data: string) => removeGeoData(data, 'flood')}
              />
            ) : null}
          </div>
          <div className="flex items-center gap-1 py-3">
            <input
              type="checkbox"
              className="accent-primary-gray w-[17px] h-[17px]"
              id="bushfire"
              onChange={(e) => {
                if (e.target.checked) {
                  setGeoData({ ...geoData, fireStation: true.toString() });
                } else {
                  setGeoData({ ...geoData, fireStation: false.toString() });
                }
              }}
            />
            <label htmlFor="bushfire" className="font-medium text-primary-gray">
              Bushfire + D2 fire station
            </label>
          </div>
          <div className="flex items-center gap-1 py-3">
            <input
              type="checkbox"
              className="accent-primary-gray w-[17px] h-[17px]"
              id="crime"
              onChange={(e) => {
                if (e.target.checked) {
                  setGeoData({ ...geoData, policeStation: true.toString() });
                } else {
                  setGeoData({ ...geoData, policeStation: false.toString() });
                }
              }}
            />
            <label htmlFor="crime" className="font-medium text-primary-gray">
              Crime + D2 police station
            </label>
          </div>

          <div className="w-full">
            <div
              className={`w-full flex items-center gap-2 py-3 ${
                climateSubMenu ? 'border-b border-primaryGray' : ''
              }`}
            >
              <img
                src={Arrow}
                alt="open submenu"
                className={`cursor-pointer ml-1 ${
                  climateSubMenu ? 'transform rotate-90' : ''
                }`}
                onClick={() => setClimateSubMenu((pre) => !pre)}
              />
              <span className="font-medium text-primary-gray">Climate</span>
            </div>
            {climateSubMenu ? (
              <RiskSubMenu
                items={CLIMATE_SUB_MENU}
                geoData={geoData.Climate}
                AddGeoData={(data: string) => AddGeoData(data, 'climate')}
                removeGeoData={(data: string) => removeGeoData(data, 'climate')}
              />
            ) : null}
          </div>

          <div className="w-full">
            <div
              className={`w-full flex items-center gap-2 py-3 ${
                dzoneSubMenu ? 'border-b border-primaryGray' : ''
              }`}
            >
              <img
                src={Arrow}
                alt="open submenu"
                className={`cursor-pointer ml-1 ${
                  dzoneSubMenu ? 'transform rotate-90' : ''
                }`}
                onClick={() => setDzoneSubMenu((pre) => !pre)}
              />
              <label
                htmlFor="location"
                className="font-medium text-primary-gray"
              >
                D_Zone
              </label>
            </div>
            {dzoneSubMenu ? (
              <RiskSubMenu
                items={DZONE_SUB_MENU}
                geoData={geoData.D_Zone}
                AddGeoData={(data: string) => AddGeoData(data, 'dzone')}
                removeGeoData={(data: string) => removeGeoData(data, 'dzone')}
              />
            ) : null}
          </div>
          <div className="flex items-center gap-1 py-3">
            <input
              type="checkbox"
              className="accent-primary-gray w-[17px] h-[17px]"
              id="roof-type"
              onChange={(e) => {
                if (e.target.checked) {
                  setGeoData({
                    ...geoData,
                    Roof_Type: e.target.checked?.toString(),
                  });
                }
              }}
            />
            <label
              htmlFor="roof-type"
              className="font-medium text-primary-gray"
            >
              Roof Type
            </label>
          </div>
          <div className="flex items-center gap-1 py-3">
            <input
              type="checkbox"
              className="accent-primary-gray w-[17px] h-[17px]"
              id="roof-visual"
              onChange={(e) => {
                if (e.target.checked) {
                  setGeoData({
                    ...geoData,
                    Roof_Visual: e.target.checked?.toString(),
                  });
                }
              }}
            />
            <label
              htmlFor="roof-visual"
              className="font-medium text-primary-gray"
            >
              Roof Visual
            </label>
          </div>
          <div className="flex items-center gap-1 py-3">
            <input
              type="checkbox"
              className="accent-primary-gray w-[17px] h-[17px]"
              id="size"
              onChange={(e) => {
                if (e.target.checked) {
                  setGeoData({
                    ...geoData,
                    Building_Size: e.target.checked?.toString(),
                  });
                }
              }}
            />
            <label htmlFor="size" className="font-medium text-primary-gray">
              Building Size
            </label>
          </div>
          <div className="flex items-center gap-1 py-3">
            <input
              type="checkbox"
              className="accent-primary-gray w-[17px] h-[17px]"
              id="year"
              onChange={(e) => {
                if (e.target.checked) {
                  setGeoData({
                    ...geoData,
                    Construction_Year: e.target.checked?.toString(),
                  });
                }
              }}
            />
            <label htmlFor="year" className="font-medium text-primary-gray">
              Construction Year
            </label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="primary-btn btn w-full h-12 p-3 mt-12"
        onClick={handleCreatePolciy}
        disabled={isCreating || !isFeatureFetched}
      >
        {isCreating ? 'Generating Risk Score' : 'Calculate Risk Score'}
      </button>
    </div>
  );
};

export default RiskGeoData;
