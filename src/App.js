import React from "react";

import { Header, Footer } from "nhsuk-react-components";

import Form from "./pages/Form";

function App() {
  return (
    <>
      <Header transactional>
        <Header.Container>
          <Header.Logo href="/" />
          <Header.ServiceName href="/">QR Code Generator</Header.ServiceName>
        </Header.Container>
      </Header>
      <Form />
      <Footer>
        <Footer.List>
          <Footer.ListItem href="/">QR Code Generator</Footer.ListItem>
        </Footer.List>
        <Footer.Copyright>&copy; Crown copyright</Footer.Copyright>
      </Footer>
    </>
  );
}

export default App;
