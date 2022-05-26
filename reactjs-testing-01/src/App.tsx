import React from "react";
import "./App.css";
import CounterButton from "./components/CounterButton";
import { CounterProvider } from "./components/CounterProvider";
import CounterValue from "./components/CounterValue";

function App() {
  return (
    <div className="App">
      <CounterProvider>
        <CounterValue />
        <CounterButton/>
      </CounterProvider>
    </div>
  );
}

export default App;
