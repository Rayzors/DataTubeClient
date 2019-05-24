<template>
  <div ref="barChart"></div>
</template>

<script>
import * as d3 from 'd3';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      chartDatas: [],
      svg: null,
      xScale0: null,
      xScale1: null,
      yScale: null,
      datas: null,
      chart: null,
    };
  },
  computed: {
    ...mapGetters(['getCompare'])
  },
  methods: {
    updateData() {
      if(this.getCompare) {
        const { numberOfPublicationByDay } = this.datas
        numberOfPublicationByDay.forEach(i => {
          i.value2 = i.value + 1 // temporaire en attente des comparaisons
        });
        this.chart.selectAll(".bar.value")
                  .attr("transform", d => `translate(${this.xScale0(d.label)},0)`)
        this.chart.selectAll(".bar.value2")
          .attr("height", d => {
            return this.height - this.margin.top - this.margin.bottom - this.yScale(d.value2)
          })
        .attr("transform", d => `translate(${this.xScale0(d.label)},0)`);

      } else {
        this.chart.selectAll(".bar.value")
                  .attr("transform", d => `translate(${this.xScale0(d.label) + (this.xScale1.bandwidth() / 2)},0)`)
        this.chart.selectAll(".bar.value2")
          .attr("height", d => 0)
      }
    }
  },
  mounted () {
    const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
    const url = 'https://datatubeapi.kevinmanssat.fr/ressources/country/FR/category/10/subscribers/10000-100000';
    days.forEach(day => this.chartDatas.push({category: day, values: []}));

    const container = d3.select(this.$refs.barChart)
    this.width = 500
    this.height = 300
    this.margin = {top: 30, right: 20, bottom: 30, left: 50}
    const barPadding = .2
    const axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};

    const svg = container.append("svg")
                          .attr("width", this.width)
                          .attr("height", this.height)
                          .append("g")
                          .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

    d3.json('https://datatubeapi.kevinmanssat.fr/ressources/country/FR/category/2/subscribers/10000-100000').then((data) => {
      const { numberOfPublicationByDay } = data
      this.datas = data
      numberOfPublicationByDay.push(numberOfPublicationByDay.shift())
      numberOfPublicationByDay.forEach(i => {
        i.value2 = i.value + 1 // temporaire en attente des comparaisons
      });
      this.xScale0 = d3.scaleBand().range([0, this.width - this.margin.left - this.margin.right]).padding(barPadding);
      this.xScale1 = d3.scaleBand();
      this.yScale = d3.scaleLinear().range([this.height - this.margin.top - this.margin.bottom, 0]);

      const xAxis = d3.axisBottom(this.xScale0).tickSizeOuter(axisTicks.outerSize);
      const yAxis = d3.axisLeft(this.yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);

      this.xScale0.domain(numberOfPublicationByDay.map(d => d.label));
      this.xScale1.domain(['value', 'value2']).range([0, this.xScale0.bandwidth()]);
      this.yScale.domain([0, d3.max(numberOfPublicationByDay, d => d.value > d.value2 ? d.value : d.value2)]);

      this.chart = svg.selectAll(".model_name")
                            .data(numberOfPublicationByDay)
                            .enter().append("g")
                            .attr("class", "model_name");

      this.chart.selectAll(".bar.value")
        .data(d => [d])
        .enter()
        .append("rect")
        .attr("class", "bar value")
        .style("fill","#3f78de")
        .attr("x", d =>  this.xScale1('value'))
        .attr("y", d => this.yScale(d.value))
        .attr("width", this.xScale1.bandwidth())
        .attr("transform", d => `translate(${this.xScale0(d.label) + (this.xScale1.bandwidth() / 2)},0)`)
        .attr("height", d => {
          return this.height - this.margin.top - this.margin.bottom - this.yScale(d.value)
          return 0
        });
        
      this.chart.selectAll(".bar.value2")
          .data(d => [d])
          .enter()
          .append("rect")
          .attr("class", "bar value2")
        .style("fill","#de543f")
          .attr("x", d => this.xScale1('value2'))
          .attr("y", d => this.yScale(d.value2))
          .attr("width", this.xScale1.bandwidth())
          .attr("height", d => {
            return 0
          });
      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0,${this.height - this.margin.top - this.margin.bottom})`)
        .call(xAxis);
      
      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis); 
    })
  },
  watch: {
    getCompare() {
      this.updateData()
    },
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