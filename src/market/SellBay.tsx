import React, { useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap"
import axios from "axios";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue
} from 'recoil';
import BarChartSellBay from "./d3/BarChartSellBay";

const url = `https://api.flasherup.com/market/sell-bay?start=2022-08-19&end=2022-08-20&breakdown=hour`;
const fetchSellBay = selector({
  key: "sellBaySelector",
  get: async ({ get }) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
});

type DataSrc = {
  max_price: number
  min_price: number
  sum_bay_amount: number
  sum_sell_amount: number
  start: string
  end: string
}

type DataAvg = {
  max_price: number
  min_price: number
  sum_bay_amount: number
  sum_sell_amount: number
  start: Date
  end: Date
}


const toAverage = function(data: DataSrc[]): DataAvg[] {
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

function SellBay() {
  const reference = useRef(null);
  const marketData = useRecoilValue(fetchSellBay);

  useEffect(() => {
    if (marketData && marketData.length) {
      //vis = new D3Component(refElement.current, { data, width, height });
      barChart = new BarChartSellBay(reference.current);
      const avg = toAverage(marketData);
      console.log("avg", avg);
      barChart.initialize(avg);
    }
  }, [marketData]);

  return (
    <Row>
      <Col>
        <svg ref={reference} width="100%" height="300" />
      </Col>
    </Row>
  );
}

export default SellBay;