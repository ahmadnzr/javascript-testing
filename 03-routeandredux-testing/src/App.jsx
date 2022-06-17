import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="menu">
          <Link to={"/"}>Home</Link>
          <Link to={"/about"} data-testid="to-about">
            About
          </Link>
          <Link to={"/contact"} data-testid="to-contact">
            Contact
          </Link>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
