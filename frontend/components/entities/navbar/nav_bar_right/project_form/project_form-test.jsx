import React, { useState } from "react";
import { merge } from "lodash";
const App = () => {
  const [projectData, setProjectData] = useState({
    title: "",
    latitude: "",
    longitude: "",
    city: "New York",
    country: "USA",
    continent: "North America",
    valuation: "1",
    cashflow: "",
    model_id: "870fb9d9-b5d2-4565-a6dd-65f9a1f4d00e",
    summary: "summary",
    capital_required: "",
    actual_cashflow: "",
    accum_projected_cashflow: "",
    accum_actual_cashflow: "",
    projected_cashflow: "",
    revenue: 0.1,
    description: "hkopt",
  });

  const changeHandle = (e) => {
    setProjectData(
      merge({}, projectData, {
        [e.target.name]: e.target.value,
      }),
    );
  };

  const submitHandle = (e) => {
    e.preventDefault();
    console.log(projectData);
  };

  return (
    <form onSubmit={submitHandle}>
      <div>
        <input type="text" name="latitude" value={projectData.latitude} onChange={changeHandle} />
      </div>
      <div>
        <input
          type="email"
          name="longitude"
          value={projectData.longitude}
          onChange={changeHandle}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default App;
