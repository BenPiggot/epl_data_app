$(document).ready(function(){

  $.ajax({
     type: "GET",
     contentType: "application/json; charset=utf-8",
     url: '/graphic/data',
     dataType: 'json',
     success: function (data) {
       makeCharts(data)
     }  
  })
})


function makeCharts(data) {

  d3.select('.container').selectAll('div.names')
      .data(data)
      .enter()
      .append('div')
      .attr('class', 'row names')
      .html(function(d, i) { return d.name })

  d3.select('svg')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('width', 10)
      .attr('height', function(d) { return d.goals * 10})
      .attr('x', function(d, i ) { return i * 10 })
      .attr('y', function(d, i) { return 100 - (d.goals * 10) } )
  
  var plot =  d3.select('#scatterplot')
    .selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('transform', function(d) {
      return "translate(" + (d.minutes/10) + "," + (120 - (d.goals * 10)) + ")";
    })

  plot.append('circle')
    .attr('r', function(d) {return d.goals * 2})
    .attr('fill', '#ddd')

  plot.append('text')
    .text(function(d) { if (d.goals > 0) return d.name })
    .attr('font-size', '8px')
}