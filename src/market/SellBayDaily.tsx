import React, { useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap"
import {useRecoilValue} from 'recoil';
import BarChartSellBay from "./d3/BarChartSellBay";
import {SellBayState, fetchSellBay} from "../recoil/market";

type GraphData = {
  max_price: number
  min_price: number
  sum_bay_amount: number
  sum_sell_amount: number
  start: Date
  end: Date
}


const toAverage = function(data: SellBayState[]): GraphData[] {
  const maxMaxPrice = Math.max(...data.map(d=>d.max_price))
  const maxMinPrice = Math.max(...data.map(d=>d.min_price))
  const maxSumAmount = Math.max(...data.map(d=>d.sum_bay_amount), ...data.map(d=>d.sum_sell_amount))
  return data.map(d=>{
    return {
      max_price: d.max_price/maxMaxPrice,
      min_price: d.min_price/maxMinPrice,
      sum_bay_amount: d.sum_bay_amount/maxSumAmount,
      sum_sell_amount: d.sum_sell_amount/maxSumAmount,
      start: new Date(d.start),
      end: new Date(d.end),
    }
  })
}

let barChart: BarChartSellBay;

function SellBayDaily() {
  const reference = useRef(null);
  const marketData = useRecoilValue(fetchSellBay);

  useEffect(() => {
    if (marketData && marketData.length) {
      barChart = new BarChartSellBay(reference.current);
      const avg = toAverage(marketData);
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

export default SellBayDaily;