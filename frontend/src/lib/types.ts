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
