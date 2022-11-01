// import React from "react";
import "../page/index.css";
import About from "./About";
import Promo from "./Promo";
import Techs from "./Techs";
import AboutMe from "./AboutMe";
import Portfolio from "./Portfolio";
import Footer from "./Footer";
import Header from "./Header";
// import { NavLink, Link, Route, Routes, Router } from "react-router-dom";

function Main(props) {
  return (
    <div className="page">
      <main className="main">
        <Header main={true} />
        <Promo />
        <About />
        <Techs />
        <AboutMe />
        <Portfolio />
        <Footer />
      </main>
    </div>
  );
}

export default Main;
