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
        <React.Suspense fallback={<div>Loading...</div>}>
          <Row>
            <Col>
              <SelectedDay />
            </Col>
          </Row>
        </React.Suspense>
      </Container>
    </RecoilRoot>
  );
}

export default App;
