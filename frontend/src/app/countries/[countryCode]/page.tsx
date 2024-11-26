/* eslint @next/next/no-img-element:off */

import Link from "next/link";
import { type FC } from "react";
import { CameraOff } from "lucide-react";
import { notFound } from "next/navigation";

import { PopulationChart } from "./population-chart";

import { getAllCountries, getCountryByCode } from "~/lib/data";
import { routes } from "~/lib/routes";

export const generateStaticParams = async () => {
  const countries = await getAllCountries();

  return countries.map(({ code }) => ({
    countryCode: code,
  }));
};

export const generateMetadata = async ({ params }: Props) => {
  const { countryCode } = await params;

  const country = await getCountryByCode(countryCode);

  return {
    title: country.commonName,
  };
};

type Props = {
  params: Promise<{
    countryCode: string;
  }>;
};

const CountryPage: FC<Props> = async ({ params }) => {
  const { countryCode } = await params;

  const country = await getCountryByCode(countryCode);
  const countryHasBorders =
    Array.isArray(country.borders) && country.borders.length > 0;

  if (!country.commonName) notFound();

  return (
    <main className="py-14">
      <div className="mx-auto max-w-xl">
        <h1 className="text-2xl font-bold">{country.commonName}</h1>
        <p className="text-sm text-slate-600">
          or <strong>{country.officialName}</strong>
        </p>
        {country.flagURL ? (
          <img
            className="mx-auto my-10 h-96 rounded-lg"
            src={country.flagURL}
            alt={`${country.commonName} flag`}
          />
        ) : (
          <div className="mx-auto my-10 flex h-96 w-full items-center justify-center rounded-lg bg-slate-100">
            <CameraOff className="h-48 w-48 text-slate-400" />
          </div>
        )}

        {countryHasBorders && (
          <>
            <h2 className="pb-3 text-xl font-bold">Borders with</h2>
            <div className="flex flex-wrap items-center gap-x-5">
              {country.borders.map((country) => (
                <Link
                  className="rounded-lg p-3 transition duration-300 hover:bg-slate-50"
                  key={country.name}
                  href={routes.countryPage(country.code)}
                >
                  {country.flagURL ? (
                    <img
                      className="mb-2 h-16 rounded-sm"
                      src={country.flagURL}
                      alt={`${country.name} flag`}
                    />
                  ) : (
                    <div className="mx-auto mb-2 flex h-16 w-full items-center justify-center rounded-sm bg-slate-100">
                      <CameraOff className="h-8 w-8 text-slate-400" />
                    </div>
                  )}
                  <p className="text-sm text-slate-600">{country.name}</p>
                </Link>
              ))}
            </div>
          </>
        )}
        <h2 className="py-8 text-xl font-bold">Population through the years</h2>
        <PopulationChart population={country.population} />
      </div>
    </main>
  );
};

export default CountryPage;
