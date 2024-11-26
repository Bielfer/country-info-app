"use client";

import Link from "next/link";
import { type ChangeEvent, useState, type FC } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { routes } from "~/lib/routes";
import { type Country } from "~/lib/types";

type Props = {
  countries: Country[];
};

export const SearchCountries: FC<Props> = ({ countries }) => {
  const [inputValue, setInputValue] = useState("");

  const countryLimit = 10;
  const displayedCountries = countries
    .filter(({ code, name }) => {
      const lowerCaseValue = inputValue.toLowerCase();

      return (
        code.toLowerCase().includes(lowerCaseValue.toLowerCase()) ||
        name.toLowerCase().includes(lowerCaseValue.toLowerCase())
      );
    })
    .slice(0, countryLimit);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  return (
    <>
      <Input
        className="mb-10"
        placeholder="Ex: US or United States"
        value={inputValue}
        onChange={handleSearchChange}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedCountries.map((country) => (
            <TableRow key={country.code}>
              <TableCell className="font-medium">
                <Link
                  className="hover:underline"
                  href={routes.countryPage(country.code)}
                >
                  {country.code}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  className="hover:underline"
                  href={routes.countryPage(country.code)}
                >
                  {country.name}
                </Link>
              </TableCell>
              <TableCell className="text-right">
                <Button asChild size="sm" variant="outline">
                  <Link href={routes.countryPage(country.code)}>See More</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
