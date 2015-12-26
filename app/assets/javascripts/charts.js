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
}