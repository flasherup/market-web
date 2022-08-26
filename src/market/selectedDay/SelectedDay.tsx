import React from "react";
import { Row, Col } from "react-bootstrap";
import { useRecoilState } from 'recoil';
import { marketSelectedDay } from "../../recoil/market";
import PricesHourly from "./PricesHourly";
import SellBayHourly from "./SellBayHourly";
import OverboughtHourly from "./OverboughtHourly";
import {dateToString} from "../../utils/time";

function SelectedDay() {
  const [selected, setSelected] = useRecoilState(marketSelectedDay);
  return (
    <Row>
      <Col>
        <Row>
          <Col>
            Selected day {dateToString(selected)}
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
        <Row>
          <Col>
            <OverboughtHourly />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default SelectedDay;