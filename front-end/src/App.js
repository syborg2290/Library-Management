import React from "react";
import { Container } from "@material-ui/core";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter} from "react-router-dom";
import Home from "./components/Home/Home";

function App() {
  return (
    <BrowserRouter>
    <Container maxWidth="xl">
      <NavBar/>
      <Home/>

     

    </Container>
    </BrowserRouter>
  );
}

export default App;
