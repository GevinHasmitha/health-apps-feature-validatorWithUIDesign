import React, { createContext, useState } from "react";

interface Sample {
  name: string;
  apiName?: string;
  data: string;
}

interface SelectedSampleContextType {
  loadSample: Sample | null;
  selectedLabel: string | null;
  setLoadSample: React.Dispatch<React.SetStateAction<Sample | null>>;
  setSelectedLabel: React.Dispatch<React.SetStateAction<string | null>>;
}

export const SelectedSampleContext = createContext<SelectedSampleContextType>(
  {} as SelectedSampleContextType
);

export const SelectedSampleProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [loadSample, setLoadSample] = useState<Sample | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  return (
    <SelectedSampleContext.Provider
      value={{ loadSample, setLoadSample, selectedLabel, setSelectedLabel }}
    >
      {children}
    </SelectedSampleContext.Provider>
  );
};
