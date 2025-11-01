'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  calculateTimeLeft,
  createLaunchDate,
  type TimeLeft,
} from '@lib/utils/countdown';

interface CountdownContextType {
  timeLeft: TimeLeft;
}

const CountdownContext = createContext<CountdownContextType | undefined>(
  undefined,
);

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownProvider: React.FC<CountdownProviderProps> = ({
  children,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(createLaunchDate()),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(createLaunchDate()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <CountdownContext.Provider value={{ timeLeft }}>
      {children}
    </CountdownContext.Provider>
  );
};

export const useCountdown = (): CountdownContextType => {
  const context = useContext(CountdownContext);
  if (context === undefined) {
    throw new Error('useCountdown must be used within a CountdownProvider');
  }
  return context;
};
