import { APP_ENTRYPOINT } from '@/config/config';
import { authenticatedRequest } from '../request';
import { GetGeoRouteParams } from '../types/automotive-insurance';

export const getGeoRoute = async (params: GetGeoRouteParams) => {
  const response = await authenticatedRequest.get(
    `${APP_ENTRYPOINT}/geo/route?startPoint={"latitude": ${params.startPoint.latitude},"longitude":${params.startPoint.longitude}}&endPoint={"longitude": ${params.endPoint.longitude},"latitude":${params.endPoint.latitude}}`
  );
  return response;
};

export const searchLocation = async (values: { query: string }) => {
  const response = await authenticatedRequest.get(
    `${APP_ENTRYPOINT}/geo/search`,
    {
      params: values,
    }
  );
  return response;
};

export const getLocationFromCoordinates = async (location: {
  longitude: number;
  latitude: number;
}) => {
  const response = await authenticatedRequest.get(
    `${APP_ENTRYPOINT}/geo/reverse`,
    {
      params: location,
    }
  );
  return response;
};

export const getElevation = async (params: {
  longitude: number;
  latitude: number;
}) => {
  const response = await authenticatedRequest.get(
    `${APP_ENTRYPOINT}/home-insr/elevation`,
    { params }
  );
  return response;
};
