import React from "react";
import "./App.css";
import FavoriteNumber from "./components/FavoriteNumber";
import SimpleForm from "./components/SimpleForm";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <FavoriteNumber />
        <SimpleForm />
      </header>
    </div>
  );
};

export default App;
