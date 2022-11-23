import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Header, Footer } from "nhsuk-react-components";

import Form from "./pages/Form";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header transactional>
        <Header.Container>
          <Header.Logo href="/" />
          <Header.ServiceName href="/">QR Code Generator</Header.ServiceName>
        </Header.Container>
      </Header>
      <Switch>
        <Route exact path="/" component={Form} />
      </Switch>
      <Footer>
        <Footer.List>
          <Footer.ListItem href="/">QR Code Generator</Footer.ListItem>
        </Footer.List>
        <Footer.Copyright>&copy; Crown copyright</Footer.Copyright>
      </Footer>
    </BrowserRouter>
  );
}

export default App;
