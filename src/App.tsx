import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Main from "./market/Main"
import SellBay from "./market/SellBay"
import {
  RecoilRoot
} from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <Container>
        <Row>
          <Col>
            <Main />
          </Col>
        </Row>
        <Row>
          <Col>
            <SellBay />
          </Col>
        </Row>
      </Container>
    </RecoilRoot>
  );
}

export default App;
