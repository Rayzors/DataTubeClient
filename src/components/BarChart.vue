<template>
  <div ref="barChart"></div>
</template>

<script>
import * as d3 from 'd3';
export default {
  data() {
    return {
      chartDatas: [],
    };
  },
  mounted () {
    const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
    const url = 'https://datatubeapi.kevinmanssat.fr/ressources/country/FR/category/10/subscribers/10000-100000';
    days.forEach(day => this.chartDatas.push({category: day, values: []}));

    const container = d3.select(this.$refs.barChart),
    width = 500,
    height = 300,
    margin = {top: 30, right: 20, bottom: 30, left: 50},
    barPadding = .2,
    axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};

const svg = container
   .append("svg")
   .attr("width", width)
   .attr("height", height)
   .append("g")
   .attr("transform", `translate(${margin.left},${margin.top})`);

    d3.json('https://datatubeapi.kevinmanssat.fr/ressources/country/FR/category/10/subscribers/10000-100000')
      .then((data) => {
        const { numberOfPublicationByDay } = data
        numberOfPublicationByDay.push(numberOfPublicationByDay.shift())
        numberOfPublicationByDay.forEach(i => {
            i.value2 = i.value + 1 // temporaire en attente des comparaisons
          });
        console.log(numberOfPublicationByDay)
        const xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding);
        const xScale1 = d3.scaleBand();
        const yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);

        const xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
        const yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);

        xScale0.domain(numberOfPublicationByDay.map(d => d.label));
        xScale1.domain(['value', 'value2']).range([0, xScale0.bandwidth()]);
        yScale.domain([0, d3.max(numberOfPublicationByDay, d => d.value > d.value2 ? d.value : d.value2)]);

        const chartName = svg.selectAll(".model_name")
                              .data(numberOfPublicationByDay)
                              .enter().append("g")
                              .attr("class", "model_name")
                              .attr("transform", d => `translate(${xScale0(d.label)},0)`);

        chartName.selectAll(".bar.value")
          .data(d => [d])
          .enter()
          .append("rect")
          .attr("class", "bar value")
          .style("fill","#3f78de")
          .attr("x", d =>  xScale1('value'))
          .attr("y", d => yScale(d.value))
          .attr("width", xScale1.bandwidth())
          .attr("height", d => {
            return height - margin.top - margin.bottom - yScale(d.value)
            return 0
          });
          chartName.selectAll(".bar.value2")
            .data(d => [d])
            .enter()
            .append("rect")
            .attr("class", "bar value2")
          .style("fill","#de543f")
            .attr("x", d => xScale1('value2'))
            .attr("y", d => yScale(d.value2))
            .attr("width", xScale1.bandwidth())
            .attr("height", d => {
              return height - margin.top - margin.bottom - yScale(d.value2)
            });
        
        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
          .call(xAxis);
        
        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis); 
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