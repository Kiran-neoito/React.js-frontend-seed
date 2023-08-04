import { APP_ENTRYPOINT } from '@/config/config';
// import { automotivegeoProps } from '@/Pages/CreateSingleAutomotiveInsurance/CreateSingleAutomotiveInsurance';
import { authenticatedRequest } from '../request';
import {
  CreateMultiParams,
  CreatSingleAutoParams,
  GetInsuranceParams,
} from '../types/automotive-insurance';

export const deleteAutomotiveInsurance = async (policyId: string) => {
  const response = await authenticatedRequest.delete(
    `${APP_ENTRYPOINT}/auto-insr/${policyId}`
  );
  return response;
};

export const getAutomotiveInsurances = async (params: GetInsuranceParams) => {
  const response = await authenticatedRequest.get(
    `${APP_ENTRYPOINT}/auto-insr`,
    { params }
  );
  return response;
};

export const getAutomotiveInsurance = async (id: string) => {
  const response = await authenticatedRequest.get(
    `${APP_ENTRYPOINT}/auto-insr/${id}`
  );
  return response;
};

export const getMasterPolicy = async (id: string) => {
  const response = await authenticatedRequest.get(
    `${APP_ENTRYPOINT}/auto-insr/multi/${id}`
  );
  return response;
};

export const createAutomotivePolicy = async (
  policyData: CreatSingleAutoParams
) => {
  const response = await authenticatedRequest.post(
    `${APP_ENTRYPOINT}/auto-insr`,
    policyData
  );
  return response;
};

export const createMultiRoutePolicy = async (args: CreateMultiParams) => {
  const response = await authenticatedRequest.post(
    `${APP_ENTRYPOINT}/auto-insr/multi`,
    args
  );
  return response;
};

export const getSubPolicyList = async (
  master: string,
  params: GetInsuranceParams
) => {
  const response = await authenticatedRequest.get(
    `${APP_ENTRYPOINT}/auto-insr/sub-policy/${master}`,
    { params }
  );
  return response;
};
