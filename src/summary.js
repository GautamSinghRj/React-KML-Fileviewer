import React from "react";

function Summary({ geoJsonData }) {
  const countElements = () => {
    const counts = {};
    if (
      geoJsonData &&
      geoJsonData.features &&
      Array.isArray(geoJsonData.features)
    ) {
      geoJsonData.features.forEach((feature) => {
        if (feature && feature.geometry && feature.geometry.type) {
          const type = feature.geometry.type;
          counts[type] = (counts[type] || 0) + 1;
        }
      });
    }
    return counts;
  };

  const counts = countElements();
  return (
    <div className="mt-4">
      <h4>Summary</h4>
      {Object.keys(counts).length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Element Type</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(counts).map(([type, count]) => (
              <tr key={type}>
                <td>{type}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No geometry elements found in the uploaded file.</p>
      )}
    </div>
  );
}

export default Summary;
