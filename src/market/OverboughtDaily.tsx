import React, { useEffect, useRef, useCallback } from "react";
import { Row, Col } from "react-bootstrap";
import {useRecoilValue, useRecoilState} from 'recoil';
import LineChartOverbought from "./d3/LineChartOverbought";
import {SellBayState, fetchSellBay, marketSelectedDay} from "../recoil/market";

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

function OverboughtDaily() {
  const reference = useRef(null);
  const marketData = useRecoilValue(fetchSellBay);

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
    if (marketData && marketData.length) {
      const data = calculateOverbought(marketData);
      console.log("data",data);
      barChart.update(data);
    }
  }, [marketData]);

  return (
    <Row>
      <Col>
        <svg ref={reference} width="100%" height="150" />
      </Col>
    </Row>
  );
}

export default OverboughtDaily;