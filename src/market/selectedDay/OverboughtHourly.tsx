import React, { useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { useRecoilValue } from 'recoil';
import LineChartOverbought from "../d3/LineChartOverbought";
import { SellBayState, fetchSellBayForDay } from "../../recoil/market";

type GraphData = {
  overbought: number
  date: Date
}


const calculateOverbought = function(data: SellBayState[]): GraphData[] {
  let o = 0;
  return data.map(d=>{
    o +=  d.sum_bay_amount - d.sum_sell_amount;
    return {
      overbought: o,
      date: new Date(d.start),
    }
  })
}

let barChart: LineChartOverbought;

function OverboughtHourly() {
  const reference = useRef(null);
  const marketData = useRecoilValue(fetchSellBayForDay);

  useEffect(() => {
    barChart = new LineChartOverbought(reference.current);
    barChart.initialize();

    return () => {
      if (barChart) {
        barChart.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (marketData && marketData.length && barChart) {
      const avg = calculateOverbought(marketData);
      barChart.update(avg);
    };
  }, [marketData]);

  return (
    <Row>
      <Col>
        <svg ref={reference} width="100%" height="150" />
      </Col>
    </Row>
  );
}

export default OverboughtHourly;