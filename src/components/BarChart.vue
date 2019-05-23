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
    const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
    days.forEach(category => this.chartDatas.push({category}));

    const margin = {
      top: 20,
      right: 20,
      bottom: 70,
      left: 40,
    };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;



    const svg = d3.select(this.$refs.barChart).append('svg')
                  .attr('width', width + margin.left + margin.right)
                  .attr('height', height + margin.top + margin.bottom)
    const g = svg.append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json('https://datatubeapi.kevinmanssat.fr/ressources/country/FR/category/10/subscribers/10000-100000')
      .then((data) => {
        const { numberOfPublicationByDay } = data
        numberOfPublicationByDay.push(numberOfPublicationByDay.shift())

        this.chartDatas = [
          ...this.chartDatas,
        ];

        const categoriesNames = this.chartDatas.values.map((d) => d.label);
        const rateNames = this.chartDatas.values.map((d) => d.value);

        const x0 = d3.scaleBand()
                .rangeRound([0, width]).padding(0.1)
                .domain(categoriesNames);
        const x1 = d3.scaleBand()
                .rangeRound([0, width]).padding(0.1)
                .domain(rateNames)
          .rangeRoundBands([0, x0.bandwidth()]);
        
        const y = d3.scaleLinear().rangeRound([height, 0])
                    .domain([0, d3.max(data, function(categorie) { return d3.max(categorie.values, function(d) { return d.value; }); })]);


        const xAxis = d3.axisBottom(x0)
                        .tickFormat(0)

        const yAxis = d3.axisLeft(y)

        x0.domain(this.chartDatas.values.map((d, i) => d.label))
        y.domain([0, d3.max(this.chartDatas.values, (d) => d.value)])

        g.append("g")
          .attr("class", "x axis")
          .attr("transform", `translate(0,${height})`)
          .call(xAxis);
            
        g.append("g")
          .attr("class", "y axis")
          .call(yAxis)

        const slice = g.selectAll('.slice')
                        .data(this.chartDatas)
                        .enter()
                          .append("g")
                            .attr("class", "g")
                            .attr("transform",(d, i) => `translate(${x0(d.value)},0)`);
        console.log(this.chartDatas.values)
        slice.selectAll("rect")
              .data((d) => d.values)
              .enter()
                .append("rect")
                  .attr("width", x0.bandwidth())
                  .attr("x", (d) => x0(d.label))
                  .attr("y", (d) => y(d.value))
                  .attr("height", (d) => height - y(d.value))

        // g.selectAll(".bar")
        //     .data(numberOfPublicationByDay)
        //     .enter().append("rect")
        //     .attr("class", "bar")
        //     .attr("x", (d) => x1(d.label))
        //     .attr("width", x1.bandwidth())
        //     .attr("y", (d) => y(d.value) )
        //     .attr("height", (d) =>  height - y(d.value))
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