import React, {useState} from "react";
import QRCode from "qrcode.react";

import useWindowDimensions from "../utils/useWindowDimensions";
const fhir = require("../utils/fhir.json");

export default function QrCode({value}) {
  const { windowHeight, windowWidth } = useWindowDimensions();
  const smallestSize = (windowWidth/3) < windowHeight ? (windowWidth/3) : windowHeight; // use the smallest window dimension to figure out how big the qr code should be to fit on screen
  const qrCodeSize = smallestSize < 730 ? smallestSize - 80 : 650; // max qr code size 650

  const [qrValue, updateState] = useState(value ? value : "Example Value");
  const updateValue = e => {
    updateState(e.currentTarget.value);
  };

  return (
    <>
    <QRCode
      style={{ margin: "0 auto", display: "block" }}
      level="M"
      value={qrValue}
      id="canvas"
      size={qrCodeSize}
    />
    <textarea style={{marginTop: "20px"}} className="nhsuk-textarea" rows="10" value={qrValue} onChange={updateValue}/>
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
    data = data.replace("phone_number", userData.phone_number);
    data = data.replace("email_id", userData.email);
    data = data.replace("birthdate_admitme", userData.birthdate);
  }
  return data;
}
