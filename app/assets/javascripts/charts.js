$(document).ready(function(){

  $.ajax({
     type: "GET",
     contentType: "application/json; charset=utf-8",
     url: '/graphic/data',
     dataType: 'json',
     success: function (data) {
       makeChart(data)
     }  
  })
})


function makeChart(data) {

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
}