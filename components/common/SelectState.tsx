"use client";

import { useState, useEffect } from "react";
import { State, IState } from "country-state-city";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectStateProps {
  countryCode: string;
  onStateChange: (stateCode: string, stateName: string) => void;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
}

export function SelectState({
  countryCode,
  onStateChange,
  defaultValue,
  placeholder = "Select a state",
  className,
}: SelectStateProps) {
  const [states, setStates] = useState<IState[]>([]);

  useEffect(() => {
    if (countryCode) {
      const countryStates = State.getStatesOfCountry(countryCode);
      setStates(countryStates);
    } else {
      setStates([]);
    }
  }, [countryCode]);

  const handleStateChange = (stateCode: string) => {
    const selectedState = states.find(state => state.isoCode === stateCode);
    if (selectedState) {
      onStateChange(stateCode, selectedState.name);
    }
  };

  return (
    <Select onValueChange={handleStateChange} defaultValue={defaultValue}>
      <SelectTrigger className={className} disabled={!countryCode || states.length === 0}>
        <SelectValue placeholder={states.length === 0 ? "No states available" : placeholder} />
      </SelectTrigger>
      <SelectContent>
        {states.map((state) => (
          <SelectItem key={state.isoCode} value={state.isoCode} className="cursor-pointer">
            {state.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 