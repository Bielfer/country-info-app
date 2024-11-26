import { cache } from "react";

import { type DetailedCountry, type Country } from "./types";

const apiUrl = process.env.API_URL;

export const getAllCountries = cache(
  () =>
    fetch(`${apiUrl}/countries`).then((res) => res.json()) as Promise<
      Country[]
    >,
);

export const getCountryByCode = cache(
  (code: string) =>
    fetch(`${apiUrl}/countries/${code}`).then((res) =>
      res.json(),
    ) as Promise<DetailedCountry>,
);
