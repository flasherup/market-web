import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SellBayDaily from "./market/SellBayDaily";
import PricesDaily from "./market/PricesDaily";
import SelectedDay from "./market/selectedDay/SelectedDay";
import {RecoilRoot} from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <Container>
        <Row>
          <Col>
            <SellBayDaily />
          </Col>
        </Row>
        <Row>
          <Col>
            <PricesDaily />
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectedDay />
          </Col>
        </Row>
      </Container>
    </RecoilRoot>
  );
}

export default App;
