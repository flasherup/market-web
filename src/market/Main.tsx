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
import BarChart from "./d3/BarChart";

const url = `https://api.flasherup.com/market/aggregated?start=2022-06-01&end=2022-08-20&breakdown=week`;
const fetchUserData = selector({
  key: "userSelector",
  get: async ({ get }) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
});



let barChart:BarChart;


function Main() {
  const reference = useRef(null);
  const marketData = useRecoilValue(fetchUserData);

  useEffect(() => {
    if(marketData && marketData.length) {
      //vis = new D3Component(refElement.current, { data, width, height });
      barChart = new BarChart(reference.current)
      barChart.initialize(marketData)
    }
  }, [ marketData ]);

  return (
    <Row>
      <Col>
        <svg ref={reference}  width="100%" height="300"/>
      </Col>
    </Row>
  );
}

export default Main;