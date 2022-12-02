import React, {useState} from "react";
import Measure from "react-measure"
import { Container, Row, Col, Label, LedeText, BodyText, Input, DateInput, Radios } from "nhsuk-react-components";
import QrCode, {formatToFHIR} from '../components/QrCode';

const free_json_serialise = JSON.stringify;
const fhir_serialise = formatToFHIR;
const tab_separated_serialise = d => {
  return [d.nhs_number,
    d.family_name,
    d.given_name,
    d.birthdate].join('	');
};

const formatBirthdate = ({day, month, year}) => {
  return `${day}/${month}/${year}`;
}


export default function AdmitMe() {
  sessionStorage.clear();
  const [state, updateState] = useState({data:{}, serialise: JSON.stringify});
  const update = e => {
    const data = {...state.data};
    data[e.currentTarget.name] = e.currentTarget.value;
    const newState = {...state, data}
    updateState(newState);
  };

  const updateBirthdate = e => {
    const data = {...state.data};
    data['birthdate'] = formatBirthdate(e.currentTarget.value);
    updateState({...state, data});
  };

  const updateSerialise = e => {
    const serialise = {
      free_json: free_json_serialise,
      fhir: fhir_serialise,
      tab_separated: tab_separated_serialise
    }[e.target.value];
    const newState = {...state, serialise}
    updateState(newState);
  }

  const serialised = state.serialise(state.data);

  return (
    <div>
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="maincontent" role="main">
          <Container>
            <Row>
              <Col>
                <Label isPageHeading>ShowMyPatientID QR Code Generator</Label>
                <LedeText>A generator of QR codes containing various data in various formats.</LedeText>
                <BodyText>Generate a QR code to automatically transfer patient demographic data from the NHS app to clinical systems.</BodyText>
              </Col>
            </Row>
            <Row>
              <Col>
                <Radios
                  name="mode"
                  inline
                  id="mode"
                  onChange={updateSerialise}>
                  <Radios.Radio value='free_json'>Free JSON</Radios.Radio>
                  <Radios.Radio value='fhir'>FHIR</Radios.Radio>
                  <Radios.Radio value='tab_separated'>Tab separated</Radios.Radio>
                </Radios>
              </Col>
            </Row>
            <Row>
              <Col width="two-thirds">
                <Input id="nhs_number" name="nhs_number" label="NHS Number" onChange={update} />
                <Input id="given_name" name="given_name" label="Given Name" onChange={update} />
                <Input id="family_name" name="family_name" label="Family Name" onChange={update} />
                <DateInput id="birthdate" label="Birthdate" onChange={updateBirthdate} />
              </Col>
              <Measure
                bounds>
                {({ measureRef, contentRect }) => (
                  <Col width="one-third">
                    <div ref={measureRef}>
                      <QrCode
                        value={serialised}
                        key={serialised}
                        width={contentRect.bounds.width}></QrCode>
                    </div>
                  </Col>
                )}
              </Measure>
            </Row>
          </Container>
        </main>
      </div>
    </div>
  );
}
