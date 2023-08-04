export interface InsurancesListAutoProps {
  insurance: AutoInsurance;
  handleInsuranceTypes: (id: string, type?: string) => void;
  insuranceTypes: string[];
  onDelete: (policy: string) => void;
  selected?: boolean;
  policySelected?: string;
}

export interface InsurancesListAutoSubProps {
  insurance: AutoInsurance;
  setDownloadItem: (id: string) => void;
  download: string;
  onDelete: (policy: string) => void;
  insuranceTypes?: string[];
}
export interface AutoInsurance {
  id: number;
  policy_number: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  risk_score: number;
  centre: string;
  bld_area: string;
  expiry: string;
  type?: string;
  subPolicy?: Array<AutoInsurance>;
  geodata?: Geodata;
  totalCount: number;
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

export type AutoInsuranceData = {
  nextPage: null | number;
  previousPage: null | number;
  totalCount: number;
  totalPages: number;
  data: Array<AutoInsurance>;
};

export type FilterAuto = {
  createdAtGte: string;
  createdAtLte: string;
  type?: string;
};
