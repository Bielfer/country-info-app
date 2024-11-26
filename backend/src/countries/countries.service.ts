import { Injectable } from '@nestjs/common';
import {
  APICountry,
  APICountryData,
  APICountryFlag,
  APICountryPopulation,
  Country,
  DetailedCountry,
} from 'src/lib/types';

@Injectable()
export class CountriesService {
  async getCountries(): Promise<Country[]> {
    const countries = (await fetch(
      'https://date.nager.at/api/v3/AvailableCountries',
    ).then((res) => res.json())) as APICountry[];

    return countries.map((country) => ({
      code: country.countryCode,
      name: country.name,
    }));
  }

  async getCountryByCode(countryCode: string): Promise<DetailedCountry> {
    const countryData = await this.getCountryData(countryCode);

    const getBordersFlags = countryData.borders.map((country) =>
      this.getCountryFlag(country.countryCode),
    );

    const [countryPopulation, countryFlag, ...flags] = await Promise.all([
      this.getCountryPopulation(countryData.commonName),
      this.getCountryFlag(countryData.countryCode),
      ...getBordersFlags,
    ]);

    return {
      commonName: countryData.commonName,
      officialName: countryData.officialName,
      code: countryData.countryCode,
      flagURL: countryFlag.data.flag,
      population: countryPopulation.data.populationCounts,
      borders: countryData.borders.map((country) => ({
        code: country.countryCode,
        name: country.commonName,
        flagURL:
          flags.find((flag) => flag?.data?.iso2 === country.countryCode)?.data
            ?.flag ?? null,
      })),
    };
  }

  async getCountryData(countryCode: string): Promise<APICountryData> {
    return fetch(
      `https://date.nager.at/api/v3/CountryInfo/${countryCode}`,
    ).then((res) => res.json());
  }

  async getCountryPopulation(name: string): Promise<APICountryPopulation> {
    return fetch('https://countriesnow.space/api/v0.1/countries/population', {
      method: 'POST',
      body: JSON.stringify({
        country: name.toLowerCase(),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  }

  async getCountryFlag(iso2: string): Promise<APICountryFlag> {
    return fetch('https://countriesnow.space/api/v0.1/countries/flag/images', {
      method: 'POST',
      body: JSON.stringify({
        iso2,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  }
}
