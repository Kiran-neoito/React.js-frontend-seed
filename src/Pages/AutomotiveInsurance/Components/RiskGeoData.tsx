import { Source, Destination } from '../../../assets/images';
import React, { useState } from 'react';

interface riskGeoProps {
  handleCreatePolciy: () => void;
  location: string[];
  handleGeoData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isCreating: boolean;
  isGeoFetched: boolean;
}

const RiskGeoData: React.FC<riskGeoProps> = ({
  handleCreatePolciy,
  handleGeoData,
  location,
  isCreating,
  isGeoFetched,
}) => {
  const [current, setCurrent] = useState<'Risk' | 'Geo'>('Risk');
  const [source, destination] = location;
  return (
    <div className="max-w-96 w-3/12 p-5 bg-white min-w-[368px] flex flex-col">
      <div className="w-full flex items-center py-4 px-3 border border-gray-variant-2 rounded-md shadow mb-3 gap-2">
        <img src={Source} alt="source" />
        <span className="font-medium text-sm text-primary-gray">{source}</span>
      </div>
      <div className="w-full flex items-center py-4 px-3 border border-gray-variant-2 rounded-md shadow mb-8 gap-2">
        <img src={Destination} alt="destination" />
        <span className="font-medium text-sm text-primary-gray">
          {destination}
        </span>
      </div>
      {/* <span className="text-primary-gray mb-3 font-bold">Risk Factors</span> */}
      <div className="flex flex-col flex-1 overflow-auto justify-center gap-3 w-full">
        <div className="w-full flex items-center font-medium text-base cursor-pointer mb-2">
          <div
            className={`w-1/2 border-b flex items-center justify-center py-3 px-5 font-bold h-[52px] ${
              current === 'Risk'
                ? 'text-primary border-primary bg-[#F1F2F3]'
                : 'text-primary-gray border-primary-gray'
            }`}
            onClick={() => setCurrent('Risk')}
          >
            Risk Factors
          </div>
          <div
            className={`w-1/2 border-b flex items-center justify-center py-3 px-5 font-bold h-[52px] ${
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
              id="traffic"
              name="traffic_flow_indication"
              onChange={(e) => {
                handleGeoData(e);
              }}
            />
            <label htmlFor="traffic" className="font-bold text-primary-gray">
              Traffic Flow indication
            </label>
          </div>

          <div className="flex items-center gap-1 py-3">
            <input
              type="checkbox"
              className="accent-primary-gray w-[17px] h-[17px]"
              id="type"
              name="road_type"
              onChange={(e) => {
                handleGeoData(e);
              }}
            />
            <label htmlFor="type" className="font-bold text-primary-gray">
              Road Type
            </label>
          </div>

          <div className="flex items-center gap-1 py-3">
            <input
              type="checkbox"
              className="accent-primary-gray w-[17px] h-[17px]"
              id="direction"
              name="road_direction"
              onChange={(e) => {
                handleGeoData(e);
              }}
            />
            <label htmlFor="direction" className="font-bold text-primary-gray">
              Road Direction
            </label>
          </div>

          <div className="flex items-center gap-1 py-3">
            <input
              type="checkbox"
              className="accent-primary-gray w-[17px] h-[17px]"
              id="length"
              name="road_length"
              onChange={(e) => {
                handleGeoData(e);
              }}
            />
            <label htmlFor="length" className="font-bold text-primary-gray">
              Road Length
            </label>
          </div>

          <div className="flex items-center gap-1 py-3">
            <input
              type="checkbox"
              className="accent-primary-gray w-[17px] h-[17px]"
              id="turn"
              name="road_turn_risk"
              onChange={(e) => {
                handleGeoData(e);
              }}
            />
            <label htmlFor="turn" className="font-bold text-primary-gray">
              Road Turn Risk
            </label>
          </div>

          <div className="flex items-center gap-1 py-3">
            <input
              type="checkbox"
              className="accent-primary-gray w-[17px] h-[17px]"
              id="junction"
              name="junction_risk"
              onChange={(e) => {
                handleGeoData(e);
              }}
            />
            <label htmlFor="junction" className="font-bold text-primary-gray">
              Junction Risk
            </label>
          </div>

          <div className="flex items-center gap-1 py-3">
            <input
              type="checkbox"
              className="accent-primary-gray w-[17px] h-[17px]"
              id="traffic-light"
              name="traffic_light_risk"
              onChange={(e) => {
                handleGeoData(e);
              }}
            />
            <label
              htmlFor="traffic-light"
              className="font-bold text-primary-gray"
            >
              Traffic Light Risk
            </label>
          </div>

          <div className="flex items-center gap-1 py-3">
            <input
              type="checkbox"
              className="accent-primary-gray w-[17px] h-[17px]"
              id="accident"
              name="accident_risk"
              onChange={(e) => {
                handleGeoData(e);
              }}
            />
            <label htmlFor="accident" className="font-bold text-primary-gray">
              Accident Risk
            </label>
          </div>

          <div className="flex items-center gap-1 py-3">
            <input
              type="checkbox"
              className="accent-primary-gray w-[17px] h-[17px]"
              id="flood"
              name="vehicle_type"
              onChange={(e) => {
                handleGeoData(e);
              }}
            />
            <label htmlFor="flood" className="font-bold text-primary-gray">
              Vehicle Type
            </label>
          </div>

          <div className="flex items-center gap-1 py-3">
            <input
              type="checkbox"
              className="accent-primary-gray w-[17px] h-[17px]"
              id="flood"
              name="flood_risk"
              onChange={(e) => {
                handleGeoData(e);
              }}
            />
            <label htmlFor="flood" className="font-bold text-primary-gray">
              Flood Risk
            </label>
          </div>

          <div className="flex items-center gap-1 py-3">
            <input
              type="checkbox"
              className="accent-primary-gray w-[17px] h-[17px]"
              id="weather"
              name="weather_risk"
              onChange={(e) => {
                handleGeoData(e);
              }}
            />
            <label htmlFor="weather" className="font-bold text-primary-gray">
              Weather Risk
            </label>
          </div>

          <div className="flex items-center gap-1 py-3">
            <input
              type="checkbox"
              className="accent-primary-gray w-[17px] h-[17px]"
              id="crime"
              name="crime_risk"
              onChange={(e) => {
                handleGeoData(e);
              }}
            />
            <label htmlFor="crime" className="font-bold text-primary-gray">
              Crime Risk
            </label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="primary-btn btn w-full h-12 p-3 mt-12"
        onClick={handleCreatePolciy}
        disabled={isCreating || !isGeoFetched}
      >
        {isCreating ? 'Generating Risk Score' : 'Calculate Risk Score'}
      </button>
    </div>
  );
};

export default RiskGeoData;
