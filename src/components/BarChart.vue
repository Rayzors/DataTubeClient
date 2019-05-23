<template>
  <div ref="barChart"></div>
</template>

<script>
import * as d3 from 'd3';
import chartData from '../assets/test.json'
export default {
  data() {
    return {
      chartData: {},
    };
  },
  mounted () {
    const margin = {
      top: 20,
      right: 20,
      bottom: 70,
      left: 40,
    };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);



    const svg = d3.select(this.$refs.barChart).append('svg')
                  .attr('width', width + margin.left + margin.right)
                  .attr('height', height + margin.top + margin.bottom)
    const g = svg.append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json('https://datatubeapi.kevinmanssat.fr/ressources/country/FR/category/10/subscribers/10000-100000')
      .then(function(data) {
        const { numberOfPublicationByDay } = data
        numberOfPublicationByDay.push(numberOfPublicationByDay.shift())
        x.domain(numberOfPublicationByDay.map((d) => d.label))
        y.domain([0, d3.max(numberOfPublicationByDay, (d) => d.value)])

        g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));
            
        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y))

        g.selectAll(".bar")
            .data(numberOfPublicationByDay)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", (d) => x(d.label))
            .attr("width", x.bandwidth())
            .attr("y", (d) => y(d.value) )
            .attr("height", (d) =>  height - y(d.value))
      })
  },
  
};
</script>

<style lang="scss" scoped>
.axis {
  font: 10px sans-serif;

  & path,
  & line {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
  }
}
</style>