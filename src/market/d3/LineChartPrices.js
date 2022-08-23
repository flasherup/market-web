import * as d3 from 'd3';
import "./lineChartPrices.css"

export default class LineChartPrices {
    constructor(parent) {
        this.parent = parent;
    }

    initialize(data) {
        console.log(data)

        const margin = { left: 50, right: 10, top: 10, bottom: 30 }

        const svg = d3.select(this.parent);
        const width = this.parent.clientWidth - margin.left - margin.right;
        const height = this.parent.clientHeight - margin.bottom - margin.top;
        svg.attr("class", "prices")

        var chart = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const xScale = d3.scaleBand()
            .range([0, width]);
        xScale.domain(data.map(function (d) { return d.start; }));

        const yScale = d3.scaleLinear()
            .range([height, 0]);
        yScale.domain([d3.min(data, function (d) { return d.min_price; }), d3.max(data, function (d) { return d.max_price; })]);

        chart.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%m-%d:%H")));

        const f = d3.format("$,");

        chart.append("g")
            .call(d3.axisLeft(yScale).tickFormat(function (d) {
                return f(d);
            }).ticks(10));

        const minPriceLine = d3.line()
            .x(function (d) { return xScale(d.start) })
            .y(function (d) { return yScale(d.min_price) })

        chart.append("path")
            .datum(data)
            .attr("class", "min-price")
            .attr("d", minPriceLine)

        const maxPriceLine = d3.line()
            .x(function (d) { return xScale(d.start) })
            .y(function (d) { return yScale(d.max_price) })

        chart.append("path")
            .datum(data)
            .attr("class", "max-price")
            .attr("d", maxPriceLine)

    }

    dispose() {
        d3.select(this.parent).selectAll("*").remove();
    }
}