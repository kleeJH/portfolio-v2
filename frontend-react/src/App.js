import React from "react";
import { About, Footer, Header, Skills, Project, Education } from "./container";
import { NavBar } from "./components";
import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <Header />
      <About />
      <Education />
      <Project />
      <Skills />
      {/* <Testimonial /> */}
      <Footer />
    </div>
  );
};

export default App;
