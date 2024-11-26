export type APICountry = {
  countryCode: string;
  name: string;
};

export type APICountryData = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: APICountryData[] | null;
};

export type APICountryFlag = {
  error: boolean;
  msg: string;
  data?: {
    name: string;
    flag: string;
    iso2: string;
    iso3: string;
  };
};

export type APICountryPopulation = {
  error: boolean;
  msg: string;
  data?: {
    country: string;
    code: string;
    iso3: string;
    populationCounts: {
      year: number;
      value: number;
    }[];
  };
};

export type Country = {
  code: string;
  name: string;
};

export type DetailedCountry = {
  commonName: string;
  officialName: string;
  code: string;
  flagURL: string;
  population: { year: number; value: number }[];
  borders: {
    code: string;
    name: string;
    flagURL: string;
  }[];
};
