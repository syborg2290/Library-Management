import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Author from "./pages/Author";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/author" element={<Author/>}/>
      </Routes>
    </Router>
  );
}

export default App;
