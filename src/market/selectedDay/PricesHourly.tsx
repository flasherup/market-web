import React, { useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import {useRecoilValue} from 'recoil';
import LineChartPrices from "../d3/LineChartPrices";
import {SellBayState, fetchSellBayForDay} from "../../recoil/market";

type GraphData = {
  max_price: number
  min_price: number
  sum_bay_amount: number
  sum_sell_amount: number
  start: Date
  end: Date
}


const toGraphData = function(data: SellBayState[]): GraphData[] {
  return data.map(d=>{
    return {
      max_price: d.max_price,
      min_price: d.min_price,
      sum_bay_amount: d.sum_bay_amount,
      sum_sell_amount: d.sum_sell_amount,
      start: new Date(d.start),
      end: new Date(d.end),
    }
  })
}

let barChart: LineChartPrices;

function PricesHourly() {
  const reference = useRef(null);
  const marketData = useRecoilValue(fetchSellBayForDay);

  useEffect(() => {
    if (marketData && marketData.length) {
      barChart = new LineChartPrices(reference.current);
      const avg = toGraphData(marketData);
      console.log("avg", avg);
      barChart.initialize(avg);
    }
    return () => {
      if (barChart) {
        barChart.dispose();
      }
    };
  }, [marketData]);

  return (
    <Row>
      <Col>
        <svg ref={reference} width="100%" height="300" />
      </Col>
    </Row>
  );
}

export default PricesHourly;