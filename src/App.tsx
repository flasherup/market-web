import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Main from "./market/Main"
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
      </Container>
    </RecoilRoot>
  );
}

export default App;
