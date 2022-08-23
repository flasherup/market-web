import * as d3 from 'd3';
import "./barChartSellBay.css"

export default class BarChartSellBay {
    constructor(parent) {
        this.parent = parent;
    }

    initialize(data) {
        console.log(data)

        const margin = {left:50, right:10, top:10, bottom:30}

        const svg = d3.select(this.parent);
        const width = this.parent.clientWidth - margin.left - margin.right;
        const height = this.parent.clientHeight - margin.bottom - margin.top;
        svg.attr("class", "sell-bay")

        var chart = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const xScale = d3.scaleBand()
            .range ([0, width]);
        xScale.domain(data.map(function(d) { return d.start; }));

        console.log("height", height);
        console.log("max", d3.max(data, function(d) { return d.min_price; }));
        

        const yScale = d3.scaleLinear()
            .range ([height, 0]);
        yScale.domain([0, d3.max(data, function(d) { return d.min_price; })]);

        chart.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%m-%d:%H")));

        chart.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             return d * 100 + "%";
         }).ticks(10));


        /*chart.append("rect")
            .attr("width", rectW)
            .attr("height", rectH)
            .attr("x", width/2-rectW/2)
            .attr("y", height/2-rectH/2)*/

        const barSpace = 4
        const barWidth = (xScale.bandwidth() - barSpace * 2) / 2;

        chart.selectAll(".sum_bay_amount")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "sum_bay_amount")
            .attr("width", barWidth)
            .attr("height", d=>height-yScale(d.sum_bay_amount))
            .attr("x", d=> xScale(d.start) + barSpace)
            .attr("y", d=>yScale(d.sum_bay_amount))

        chart.selectAll(".sum_sell_amount")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "sum_sell_amount")
            .attr("width", barWidth)
            .attr("height", d=>height-yScale(d.sum_sell_amount))
            .attr("x", d=> xScale(d.start) + barWidth + barSpace)
            .attr("y", d=>yScale(d.sum_sell_amount))
    }

    dispose() {
        d3.select(this.parent).selectAll("*").remove();
    }
}