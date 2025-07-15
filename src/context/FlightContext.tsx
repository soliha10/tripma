'use client';

import { StaticImageData } from 'next/image';
import { createContext, ReactNode, useContext, useState } from 'react';

export type Flight = {
  id: number;
  pic: StaticImageData;
  duration: string;
  airlineType: string;
  time: string;
  stop?: string;
  stopDuration: string;
  price: string;
  tripType: string;
};

type Passenger = {
  firstName: string;
  lastName: string;
};

type FlightContextType = {
  selectedDepartFlight: Flight | null;
  selectedReturnFlight: Flight | null;
  setSelectedDepartFlight: (flight: Flight) => void;
  setSelectedReturnFlight: (flight: Flight) => void;

  passenger: Passenger | null;
  setPassenger: (passenger: Passenger) => void;
};

const FlightContext = createContext<FlightContextType | undefined>(undefined);

export function FlightProvider({ children }: { children: ReactNode }) {
  const [selectedDepartFlight, setSelectedDepartFlight] = useState<Flight | null>(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState<Flight | null>(null);
  const [passenger, setPassenger] = useState<Passenger | null>(null);
  return (
    <FlightContext.Provider
      value={{
        selectedDepartFlight,
        selectedReturnFlight,
        setSelectedDepartFlight,
        setSelectedReturnFlight,
        passenger,
        setPassenger,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
}

export function useFlight() {
  const context = useContext(FlightContext);
  if (!context) throw new Error('useFlight must be used within a FlightProvider');
  return context;
}
