import React from "react";
import promoLogo from "../images/Promo/landing-logo.svg";
import "../page/index.css";

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <img src={promoLogo} className="promo__img"></img>
    </section>
  );
}

export default Promo;
