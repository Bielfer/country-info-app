import { type Metadata } from "next";
import { type FC } from "react";

import { SearchCountries } from "./search-countries";

import { type Country } from "~/lib/types";
import { getAllCountries } from "~/lib/data";

export const metadata: Metadata = {
  title: "Countries List",
  description: "This is a list of all available countries on Earth.",
};

const Home: FC = async () => {
  const countries: Country[] = await getAllCountries();

  return (
    <main className="py-14">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-10 text-2xl font-bold">
          Here you can search all countries on earth
        </h1>
        <SearchCountries countries={countries} />
      </div>
    </main>
  );
};

export default Home;
