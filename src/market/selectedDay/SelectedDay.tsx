import React from "react";
import { Row, Col } from "react-bootstrap";
import { useRecoilState } from 'recoil';
import { marketSelectedDay } from "../../recoil/market";
import PricesHourly from "./PricesHourly";
import SellBayHourly from "./SellBayHourly";

function SelectedDay() {
  const [selected, setSelected] = useRecoilState(marketSelectedDay);
  return (
    <Row>
      <Col>
        <Row>
          <Col>
            Selected day {selected.toISOString()}
          </Col>
        </Row>
        <Row>
          <Col>
            <SellBayHourly />
          </Col>
        </Row>
        <Row>
          <Col>
            <PricesHourly />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default SelectedDay;