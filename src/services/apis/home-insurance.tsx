import { APP_ENTRYPOINT } from '@/config/config';

import { authenticatedRequest } from '../request';
import { GetInsuranceParams } from '../types/automotive-insurance';

interface policyProps {
  geoData: object;
  country: string;
  latitude: number;
  longitude: number;
}

export const createPolicy = async (policyData: policyProps) => {
  const res = await authenticatedRequest.post(
    `${APP_ENTRYPOINT}/home-insr`,
    policyData
  );
  return res;
};

export const getHomeInsurances = async (params: GetInsuranceParams) => {
  const response = await authenticatedRequest.get(
    `${APP_ENTRYPOINT}/home-insr`,
    { params }
  );
  return response;
};

export const deleteHomeInsurances = async (policyId: string) => {
  const response = await authenticatedRequest.delete(
    `${APP_ENTRYPOINT}/home-insr/${policyId}`
  );
  return response;
};
