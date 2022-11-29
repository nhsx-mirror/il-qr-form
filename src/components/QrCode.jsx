import React, {useState} from "react";
import {QRCodeCanvas} from "qrcode.react";

const fhir = require("../utils/fhir.json");

export default function QrCode({value, width}) {
  const [qrValue, updateState] = useState(value ? value : "Example Value");
  const updateValue = e => {
    updateState(e.currentTarget.value);
  };

  return (
    <>
    <QRCodeCanvas
      style={{ margin: "0 auto 20px", display: "block" }}
      level="M"
      value={qrValue}
      id="canvas"
      size={Math.floor(width || 0)}
    />
    <label className="nhsuk-label" htmlFor="qr-data">QR code data (editable):</label>
    <textarea id="qr-data" className="nhsuk-textarea" rows="10" value={qrValue} onChange={updateValue}/>
    </>
  );
}

// Make sure the user data is in FHIR format
export function formatToFHIR(userData) {
  let data = JSON.stringify(fhir);
  if (typeof userData.nhs_number != "undefined") {
    data = data.replace("nhs_number", userData.nhs_number);
    data = data.replace("family_name", userData.family_name);
    data = data.replace("given_name", userData.given_name);
    data = data.replace("birthdate_admitme", userData.birthdate);
  }
  return data;
}
