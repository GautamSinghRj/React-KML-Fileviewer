import "./styles.css";
import React from "react";
import { useState } from "react";
import Fileinput from "./fileinput";
import "bootstrap/dist/css/bootstrap.min.css";
import Map from "./map.jsx";
import Summary from "./summary.js";
import Detail from "./detail.js";

export default function App() {
  const [geoJsonData, setGeoJsonData] = useState(null);

  return (
    <div className="container mt-4">
      <h2>React KML Viewer</h2>
      <Fileinput setGeoJsonData={setGeoJsonData} />

      {geoJsonData && <Map geoJsonData={geoJsonData} />}

      {setGeoJsonData && <Summary geoJsonData={geoJsonData} />}
      {setGeoJsonData && <Detail geoJsonData={geoJsonData} />}
    </div>
  );
}
