import React from "react";

function calLength(coords) {
  let length = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    const [longi1, lati1] = coords[i];
    const [longi2, lati2] = coords[i + 1];
    const R = 6371e3;
    const x1 = (lati1 * Math.PI) / 180;
    const x2 = (lati2 * Math.PI) / 180;
    const x = ((lati2 - lati1) * Math.PI) / 180;
    const y = ((longi2 - longi1) * Math.PI) / 180;
    const a =
      Math.sin(x / 2) * Math.sin(x / 2) +
      Math.cos(x1) * Math.cos(x2) * Math.sin(y / 2) * Math.sin(y / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    length += R * c;
  }
  return length.toFixed(2);
}

function Detail({ geoJsonData }) {
  const details =
    geoJsonData && geoJsonData.features
      ? geoJsonData.features
          .filter(
            (feature) =>
              feature &&
              feature.geometry &&
              feature.geometry.type &&
              feature.geometry.type.includes("Line")
          )
          .map((feature, index) => ({
            type: feature.geometry.type,
            length: calLength(feature.geometry.coordinates),
          }))
      : [];

  return (
    <div className="mt-4">
      <h4>Details</h4>
      {details.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Element Type</th>
              <th>Total (m)</th>
            </tr>
          </thead>
          <tbody>
            {details.map((item, index) => (
              <tr key={index}>
                <td>{item.type}</td>
                <td>{item.length} m</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No line elements found in the uploaded file.</p>
      )}
    </div>
  );
}

export default Detail;
