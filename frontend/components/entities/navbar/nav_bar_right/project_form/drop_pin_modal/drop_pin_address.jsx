import React from "react";

const DropPinAddress = (props) => {
  console.log("DropPinAddress = ", props);
  const { lat, lng, closeModal, city, continent } = props;

  return (
    <div className="address">
      <div className="latlng">
        <input type="number" value={parseFloat(lat.toFixed(6))}></input>
        <input type="number" value={parseFloat(lng.toFixed(6))}></input>
      </div>
      <div className="address-inner">
        <div className="city">
          <div>city</div>
          <div>{city}</div>
        </div>
        <div className="continent">
          <div>continent</div>
          <div>{continent}</div>
        </div>
      </div>
      <input type="button" value="Thumbs Up" onClick={closeModal}></input>
    </div>
  );
};

export default DropPinAddress;
