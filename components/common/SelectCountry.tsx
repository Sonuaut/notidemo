"use client";

import { useState, useEffect } from "react";
import { Country, ICountry } from "country-state-city";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectCountryProps {
  onCountryChange: (countryCode: string, countryName: string) => void;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
}

function CountryOption({ country }: { country: ICountry }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={`https://flagcdn.com/w20/${country.isoCode.toLowerCase()}.png`}
        alt={country.name}
        className="h-4 w-6 rounded-sm border"
        loading="lazy"
      />
      <span>{country.name}</span>
      <span className="text-xs text-gray-500 font-mono ml-1">({country.isoCode})</span>
    </div>
  );
}

export function SelectCountry({
  onCountryChange,
  defaultValue,
  placeholder = "Select a country",
  className,
}: SelectCountryProps) {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [selected, setSelected] = useState<ICountry | undefined>(undefined);

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
    if (defaultValue) {
      const found = allCountries.find(c => c.isoCode === defaultValue);
      setSelected(found);
    }
  }, [defaultValue]);

  const handleCountryChange = (countryCode: string) => {
    const selectedCountry = countries.find(country => country.isoCode === countryCode);
    if (selectedCountry) {
      setSelected(selectedCountry);
      onCountryChange(countryCode, selectedCountry.name);
    }
  };

  return (
    <Select onValueChange={handleCountryChange} defaultValue={defaultValue}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder}>
          {selected ? <CountryOption country={selected} /> : null}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country.isoCode} value={country.isoCode} className=" cursor-pointer">
            <CountryOption country={country} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 