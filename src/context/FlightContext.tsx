'use client';

import { StaticImageData } from 'next/image';
import { createContext, ReactNode, useContext, useState, useMemo, useEffect } from 'react';

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
  birthDate: string;
  email: string;
  phoneNumber: string;
  knownTraveller: string;
  emergencyContact?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
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
  isUpgraded: boolean;
  setUpgraded: (isUpgraded: boolean) => void;
  setSelectedDepartFlight: (flight: Flight) => void;
  setSelectedReturnFlight: (flight: Flight) => void;

  passenger: Passenger | null;
  setPassenger: (passenger: Passenger) => void;

  paymentInfo: PaymentInfo | null;
  setPaymentInfo: (paymentInfo: PaymentInfo) => void;

  tripType: 'round' | 'one';
  setTripType: (type: 'round' | 'one') => void;

  checkedBagsCount: number;
  setCheckedBagsCount: (count: number) => void;

  priceCalculations: PriceCalculations;
};

const FlightContext = createContext<FlightContextType | undefined>(undefined);

export function FlightProvider({ children }: { children: ReactNode }) {
  const [selectedDepartFlight, setSelectedDepartFlight] = useState<Flight | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selectedDepartFlight');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  const [selectedReturnFlight, setSelectedReturnFlight] = useState<Flight | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selectedReturnFlight');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  const [passenger, setPassenger] = useState<Passenger | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('flightPassenger');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('flightPaymentInfo');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  const [tripType, setTripType] = useState<'round' | 'one'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('flightTripType');
      return saved ? (saved as 'round' | 'one') : 'round';
    }
    return 'round';
  });

  const [checkedBagsCount, setCheckedBagsCount] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('checkedBagsCount');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  const [isUpgraded, setUpgraded] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('flightUpgraded');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (selectedDepartFlight) {
        localStorage.setItem('selectedDepartFlight', JSON.stringify(selectedDepartFlight));
      } else {
        localStorage.removeItem('selectedDepartFlight');
      }
    }
  }, [selectedDepartFlight]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (selectedReturnFlight) {
        localStorage.setItem('selectedReturnFlight', JSON.stringify(selectedReturnFlight));
      } else {
        localStorage.removeItem('selectedReturnFlight');
      }
    }
  }, [selectedReturnFlight]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (passenger) {
        localStorage.setItem('flightPassenger', JSON.stringify(passenger));
      } else {
        localStorage.removeItem('flightPassenger');
      }
    }
  }, [passenger]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (paymentInfo) {
        localStorage.setItem('flightPaymentInfo', JSON.stringify(paymentInfo));
      } else {
        localStorage.removeItem('flightPaymentInfo');
      }
    }
  }, [paymentInfo]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('flightTripType', tripType);
    }
  }, [tripType]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('checkedBagsCount', checkedBagsCount.toString());
    }
  }, [checkedBagsCount]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('flightUpgraded', JSON.stringify(isUpgraded));
    }
  }, [isUpgraded]);

  const parsePrice = (priceString: string): number => {
    const numericString = priceString.replace(/[^0-9.]/g, '');
    return parseFloat(numericString) || 0;
  };
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
        isUpgraded,
        setUpgraded,
        passenger,
        setPassenger,
        paymentInfo,
        setPaymentInfo,
        tripType,
        setTripType,
        checkedBagsCount,
        setCheckedBagsCount,
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
