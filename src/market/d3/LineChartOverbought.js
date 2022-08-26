import * as d3 from 'd3';
import "./lineChartOverbought.css"

export default class LineChartOverbought {
    constructor(parent) {
        this.parent = parent;
    }

    initialize() {
        const margin = { left: 50, right: 10, top: 10, bottom: 30 }

        const svg = d3.select(this.parent);
        const width = this.parent.clientWidth - margin.left - margin.right;
        const height = this.parent.clientHeight - margin.bottom - margin.top;
        svg.attr("class", "overbought")

        var chart = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const xScale = d3.scaleBand()
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .range([height, 0]);

        const xAxis = chart.append("g")
            .attr("transform", "translate(0," + height + ")");

        const yAxis = chart.append("g");
            
        const negative = chart.append("path")
            .attr("class", "negative");

        const positive = chart.append("path")
            .attr("class", "positive");

        this.xScale = xScale;
        this.yScale = yScale;
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.negative = negative;
        this.positive = positive;

    }

    update(data) {
        const {xScale, yScale, xAxis, yAxis, negative, positive } = this;

        xScale.domain(data.map(function (d) { return d.date; }));

        const o = data.map(function (d) { return d.overbought; });
        const min = d3.min(o);
        const max = d3.max(o);
        const domain = [min, max];
        yScale.domain(domain);

        xAxis.call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%m-%d:%H")));

        yAxis.call(d3.axisLeft(yScale).tickFormat(function (d) {
            return d3.format("$,.2f")(d);
        }).ticks(10));

        const gorizontalShift = xScale.bandwidth()/2;

        const negativeArea = d3.area()
            .x(d => xScale(d.date) + gorizontalShift)
            .y0(yScale(Math.min(0, max)))
            .y1(d => yScale(Math.min(max, 0,d.overbought)))

        negative
            .datum(data)
            .attr("d", negativeArea);

        const positiveArea = d3.area()
            .x(d => xScale(d.date) + gorizontalShift)
            .y0(yScale(Math.max(min, 0)))
            .y1(d => yScale(Math.max(0,min,d.overbought)))

            positive
            .datum(data)
            .attr("d", positiveArea);

    }

    dispose() {
        d3.select(this.parent).selectAll("*").remove();
    }
}