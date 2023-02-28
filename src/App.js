import React, {Component} from "react";
import axios from "axios";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <html className="scroll-smooth">
      <div>
        <Navbar />
        <Home />
      </div>
    </html>
  );
}





export default App;
