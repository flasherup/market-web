import * as d3 from 'd3';
import "./barChartSellBay.css"

export default class BarChartSellBay {
  constructor(parent, onSelect) {
    this.parent = parent;
    this.selected = null;
    this.onSelect = onSelect;
  }

  initialize() {
    const margin = { left: 50, right: 10, top: 10, bottom: 30 }

    const svg = d3.select(this.parent);
    const width = this.parent.clientWidth - margin.left - margin.right;
    const height = this.parent.clientHeight - margin.bottom - margin.top;
    svg.attr("class", "sell-bay")

    var chart = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const xScale = d3.scaleBand()
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .range([height, 0]);

    const xAxis = chart.append("g")
      .attr("transform", "translate(0," + height + ")");

    const yAxis = chart.append("g");

    this.chart = chart;
    this.xScale = xScale;
    this.yScale = yScale;
    this.height = height;
    this.xAxis = xAxis;
    this.yAxis = yAxis;
  }

  update(data) {
    const {
      chart,
      xScale,
      yScale,
      height,
      xAxis,
      yAxis
    } = this;


    xScale.domain(data.map(function (d) { return d.start; }));
    yScale.domain([0, d3.max(data, function (d) { return d.min_price; })]);

    xAxis.call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%m-%d:%H")));

    yAxis.call(d3.axisLeft(yScale).tickFormat(function (d) {
      return d * 100 + "%";
    }).ticks(10));

    const barSpace = 4
    const barWidth = (xScale.bandwidth() - barSpace * 2) / 2;

    chart
      .selectAll(".selector")
      .data(data)
      .join(
        enter => enter
          .append("rect")
          .attr("class", "selector unselected"),
        update => update,
        exit => exit.remove()
      )
      .attr("width", xScale.bandwidth())
      .attr("height", height)
      .attr("x", d => xScale(d.start))
      .attr("y", 0)
      .on('click', this.onBarClick.bind(this));

    chart
      .selectAll(".sum_bay_amount")
      .data(data)
      .join(
        enter => enter
          .append("rect")
          .attr("class", "sum_bay_amount")
          .attr('pointer-events', 'none'),
        update => update,
        exit => exit.remove()
      )
      .transition()
      .attr("width", barWidth)
      .attr("height", d => height - yScale(d.sum_bay_amount))
      .attr("x", d => xScale(d.start) + barSpace)
      .attr("y", d => yScale(d.sum_bay_amount));

    chart.selectAll(".sum_sell_amount")
      .data(data)
      .join(
        enter=>enter
        .append("rect")
        .attr("class", "sum_sell_amount")
        .attr('pointer-events', 'none'),
        update=>update,
        exit=>exit.remove()
      )
      .transition()
      .attr("width", barWidth)
      .attr("height", d => height - yScale(d.sum_sell_amount))
      .attr("x", d => xScale(d.start) + barWidth + barSpace)
      .attr("y", d => yScale(d.sum_sell_amount));


    this.updateSelected();
  }

  onBarClick(event, data) {
    if (this.onSelect) this.onSelect(data.start)
  }

  updateSelected() {
    const { chart, xScale, height, selected } = this;
    if (selected) {
      chart.selectAll(".selector").each((data, i, nodes) => {
        const node = d3.select(nodes[i]);
        if (data.start == selected) {
          node.attr("class", "selector selected");
        } else {
          node.attr("class", "selector unselected");
        }
      })
    }
  }

  setSelected(date) {
    this.selected = date;
    this.updateSelected();
  }

  dispose() {
    d3.select(this.parent).selectAll("*").remove();
  }
}