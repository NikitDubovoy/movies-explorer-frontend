import React from "react";
import "../page/index.css";

const Preloader = (props) => {
  const classNamePreloader = `${
    props.isPreloader ? "preloader preloader_active" : "preloader"
  }`;
  return (
    <div className={classNamePreloader}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  );
};

export default Preloader;
