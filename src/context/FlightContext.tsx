'use client';

import { StaticImageData } from 'next/image';
import { createContext, ReactNode, useContext, useState, useMemo } from 'react';

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

type PaymentInfo = {
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVV: string;
};

type PriceCalculations = {
  subtotal: number;
  taxesAndFees: number;
  total: number;
};

type FlightContextType = {
  selectedDepartFlight: Flight | null;
  selectedReturnFlight: Flight | null;
  setSelectedDepartFlight: (flight: Flight) => void;
  setSelectedReturnFlight: (flight: Flight) => void;

  passenger: Passenger | null;
  setPassenger: (passenger: Passenger) => void;

  // Payment information
  paymentInfo: PaymentInfo | null;
  setPaymentInfo: (paymentInfo: PaymentInfo) => void;

  // Trip type for price calculations
  tripType: 'round' | 'one';
  setTripType: (type: 'round' | 'one') => void;

  // Price calculations
  priceCalculations: PriceCalculations;
};

const FlightContext = createContext<FlightContextType | undefined>(undefined);

export function FlightProvider({ children }: { children: ReactNode }) {
  const [selectedDepartFlight, setSelectedDepartFlight] = useState<Flight | null>(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState<Flight | null>(null);
  const [passenger, setPassenger] = useState<Passenger | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [tripType, setTripType] = useState<'round' | 'one'>('round');

  // Price calculation helper function
  const parsePrice = (priceString: string): number => {
    // Remove $ and any other non-numeric characters except decimal point
    const numericString = priceString.replace(/[^0-9.]/g, '');
    return parseFloat(numericString) || 0;
  };

  // Memoized price calculations that update when flights or trip type change
  const priceCalculations = useMemo((): PriceCalculations => {
    let subtotal = 0;
    if (selectedDepartFlight) {
      subtotal += parsePrice(selectedDepartFlight.price);
    }
    if (selectedReturnFlight && tripType === 'round') {
      subtotal += parsePrice(selectedReturnFlight.price);
    }

    const taxesAndFees = subtotal * 0.15;
    const total = subtotal + taxesAndFees;

    return {
      subtotal,
      taxesAndFees,
      total,
    };
  }, [selectedDepartFlight, selectedReturnFlight, tripType]);
  return (
    <FlightContext.Provider
      value={{
        selectedDepartFlight,
        selectedReturnFlight,
        setSelectedDepartFlight,
        setSelectedReturnFlight,
        passenger,
        setPassenger,
        paymentInfo,
        setPaymentInfo,
        tripType,
        setTripType,
        priceCalculations,
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
