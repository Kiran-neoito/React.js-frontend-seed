export type GetInsuranceParams = {
  page: number;
  limit: number;
  organizationId?: number;
  search: string;
  createdAtGte?: string;
  createdAtLte?: string;
  type?: string;
  polygon?: string;
};

export type Point = {
  latitude: number;
  longitude: number;
};

export type CreatSingleAutoParams = {
  country: string;
  startPoint: Point;
  endPoint: Point;
  multiPolicyNumber?: string;
  geoData: object;
  waypoints: [];
};

export type GetGeoRouteParams = {
  startPoint: {
    latitude: number;
    longitude: number;
  };
  endPoint: {
    latitude: number;
    longitude: number;
  };
};

export type CreateMultiParams = {
  country: string;
  expiry: string;
  createdOn: string;
};

export interface GeoReverseResponse {
  address: Address;
  coordinates: Coordinates;
  locationId: string;
  name: string;
}
export interface Address {
  countryCode: string;
  streetAddress: string;
  cityDistrict: string;
  addressRegion: string;
  postalCode: string;
  stateDistrict: string;
  houseNumber: string;
}
export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface transitProps {
  duration: string;
  distance: string;
}
