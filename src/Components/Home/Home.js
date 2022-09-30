import React, { lazy } from "react";
import Balance from "./Balance/Balance";
import DataCenter from "./DataCenter/DataCenter";
import LinksMain from "./AsseetQuick/LinksMain";
import Tops from "./TopColleections/Tops";
import "./homeMain.css";
import "../../../src/App.css";

import Navbar from "../Navbar";

function Home() {
  return (
    <div className="mainHome" style={{ paddingTop: "65px" }}>
      <div className="leeftPart">
        <Balance />
        <DataCenter />
        <LinksMain />
      </div>
      <div className="rightPart">
        <Tops />
      </div>
    </div>
  );
}

export default Home;
