import React, { createContext, ReactNode, useContext, useState } from "react";

export interface DateRangeContextType {
  startDate: string;
  endDate: string;
  datesSubmitted: { startDate?: string; endDate?: string };
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  handleSubmit: () => void;
}

const defaultState: DateRangeContextType = {
  startDate: "",
  endDate: "",
  datesSubmitted: {},
  setStartDate: () => {},
  setEndDate: () => {},
  handleSubmit: () => {},
};

const DateRangeContext = createContext<DateRangeContextType>(defaultState);

interface DateRangeProviderProps {
  children: ReactNode; 
}
export const DateRangeProvider: React.FC<DateRangeProviderProps> = ({
  children,
}) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [datesSubmitted, setDatesSubmitted] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});

  const handleSubmit = () => {
    setDatesSubmitted({ startDate, endDate });
  };

  return (
    <DateRangeContext.Provider
      value={{
        startDate,
        endDate,
        datesSubmitted,
        setStartDate,
        setEndDate,
        handleSubmit,
      }}
    >
      {children}
    </DateRangeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDateRange = () => useContext(DateRangeContext);
