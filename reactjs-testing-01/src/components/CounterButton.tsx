import React, { useCallback, useContext } from "react";
import { CounterContext } from "../Context/CounterContext";

const styles = {
  marginTop: "10px",
  width: "10%",
  display: "flex",
  justifyContent: "space-around",
};

const CounterButton = () => {
  const { updateCounter } = useContext(CounterContext);

  const handleUpdateCounter = useCallback(
    (type: string) => {
      if (!updateCounter) return;
      updateCounter(type);
    },
    [updateCounter]
  );

  return (
    <div style={styles}>
      <button onClick={() => handleUpdateCounter("dec")}>Decrement</button>
      <button onClick={() => handleUpdateCounter("inc")}>Increment</button>
    </div>
  );
};

export default CounterButton;
