import React, { ReactNode, useCallback, useState } from "react";
import { CounterContext } from "../Context/CounterContext";

interface Props {
  children: ReactNode;
}

export const CounterProvider = ({ children }: Props) => {
  const [counter, setCounter] = useState<number>(0);

  const updateCounter = useCallback(
    (type: string) => {
      if (type === "inc") {
        setCounter(counter + 1);
      } else if (type === "dec") {
        setCounter(counter - 1);
      }
    },
    [counter]
  );

  return (
    <CounterContext.Provider value={{ counter, updateCounter }}>
      {children}
    </CounterContext.Provider>
  );
};
