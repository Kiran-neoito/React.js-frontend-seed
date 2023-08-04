export interface InsurancesListProps {
  insurance: HomeInsurance;
  handleInsuranceTypes: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  insuranceTypes: string[];
  onDelete: (policy: string) => void;
}

export interface HomeInsurance {
  id: number;
  policy_number: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  risk_score: number;
  centre: string;
  bld_area: string;
  geodata: Geodata;
  totalCount: number;
}

export interface AutoSingleInsurance {
  id: number;
  policy_number: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  risk_score: number;
  end: string;
  start: string;
  bld_area: string;
  geodata: AutoSingleGeodata;
  totalCount: number;
}

export interface AutoSingleGeodata {
  id: number;
  geodata: AutoSingleGeoElement;
  type: string;
  policy_id_auto?: null;
  policy_id_home: string;
}

export interface AutoSingleGeoElement {
  endPoint: {
    latitude: number;
    longitude: number;
  };
  startPoint: {
    latitude: number;
    longitude: number;
  };
}

export interface Geodata {
  id: number;
  geodata: riskData;
  type: string;
  policy_id_auto?: null;
  policy_id_home: string;
}

export interface riskData {
  D_Zone: string[];
  Climate: string[];
  Flooding: string[];
  location: string;
  Roof_Type: string;
  Roof_Visual: string;
  latitude: number;
  longitude: number;
  fireStation: string;
  Building_Size: string;
  policeStation: string;
  Construction_Year: string;
}

export type HomeInsuranceData = {
  nextPage: null | number;
  previousPage: null | number;
  totalCount: number;
  totalPages: number;
  data: Array<HomeInsurance>;
};

export type AutoInsuranceData = {
  nextPage: null | number;
  previousPage: null | number;
  totalCount: number;
  totalPages: number;
  data: Array<AutoSingleInsurance>;
};

export type LocationDetailsProps = {
  locationID: string;
  streetAddress: string;
  region: string;
  countryCode: string;
};
