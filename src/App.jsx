import { useState } from "react";
import "./App.css";
import countries from "../page/countries";
import About from "../page/about";
import Region from "../page/region";
import { Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<About />} />
          <Route path="/:cca3" element={<Region />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
