import * as d3 from 'd3';

export default class BarChart {
    constructor(parent) {
        this.parent = parent;
    }

    initialize(data) {
        console.log(data)

        const svg = d3.select(this.parent);
        const width = this.parent.clientWidth;
        const height = this.parent.clientHeight;
        svg.style("background-color", "red")

        const xScale = d3.scaleBand()
            .range ([0, width]);
        xScale.domain(data.map(function(d) { return new Date(d.start); }));

        console.log("height", height);
        console.log("max", d3.max(data, function(d) { return d.min_price; }));
        

        const yScale = d3.scaleLinear()
            .range ([height, 0]);
        yScale.domain([d3.max(data, function(d) { return d.min_price; }), 0]);


        const rectW = 50
        const rectH = 50

        /*svg.append("rect")
            .attr("width", rectW)
            .attr("height", rectH)
            .attr("x", width/2-rectW/2)
            .attr("y", height/2-rectH/2)*/

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("width", 10)
            .attr("height", d=>yScale(d.min_price))
            .attr("x", d=>{
                console.log(d)
                return xScale(new Date(d.start))
            })
            .attr("y", 0)
    }
}