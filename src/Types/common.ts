export interface insurancesProps {
  id: string;
  name: string;
  last_updated: string;
  risk: string;
  lat?: number;
  long?: number;
}

export interface CommonResponse<T> {
  data: T;
}
