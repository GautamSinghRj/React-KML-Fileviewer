import React from "react";
import * as toGeoJSON from "@tmcw/togeojson";
import { DOMParser } from "@xmldom/xmldom";

function Fileinput({ setGeoJsonData }) {
  const handlefile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.onload = (e) => {
        const txt = e.target.result;
        const dom = new DOMParser().parseFromString(txt, "text/xml");
        const geoJson = toGeoJSON.kml(dom);
        setGeoJsonData(geoJson);
      };
    }
    reader.readAsText(file);
  };

  return (
    <div>
      <input
        type="file"
        accept=".kml"
        onChange={handlefile}
        className="inpfile"
      />
    </div>
  );
}
export default Fileinput;
