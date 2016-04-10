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

  $.ajax({
    type: 'GET',
    contentType: "application/json; charset=utf-8",
    url: '/fixture/data',
    dataType: 'json',
    success: function(data) {
      console.log(data)
    }
  })
})


function makeCharts(data) {
  var plot =  d3.select('#scatterplot')
    .selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('transform', function(d) {
      return "translate(" + (d.minutes/4) + "," + (375 - (d.goals * 25)) + ")";
    })

  plot.append('circle')
    .attr('r', function(d) { return d.goals * 5 })
    .attr('fill', '#ddd')
    .on('mouseover', comparePosition)
    .on('mouseout', unHighlight)
    .on('click', displayModal)

  plot.append('text')
    .text(function(d) { if (d.goals > 0) return d.name })
    .attr('font-size', '14px')

  var xExtent = d3.extent(data, function(d) {
    return d.minutes;
  })

  var yExtent = d3.extent(data, function(d) {
    return d.goals;
  })

  var xScale = d3.scale.linear().domain(xExtent).range([0, 750]);
  var yScale = d3.scale.linear().domain(yExtent).range([360, 0]);

  var yAxis = d3.svg.axis().scale(yScale).orient('left')
  d3.select('#scatterplot').append('g').attr('id', 'yAxis').call(yAxis);

  var xAxis = d3.svg.axis().scale(xScale).orient('bottom');
  d3.select('#scatterplot').append('g').attr('id', 'xAxis').call(xAxis);
  d3.selectAll('#xAxis').attr('transform', 'translate(0, 360)');

  d3.selectAll('path.domain').style('fill', 'none').style('stroke', 'black');

  d3.select('#scatterplot').append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", 400)
    .attr("y", 405)
    .text("Minutes played")
    .style('font-size', '14px')

  d3.select('#scatterplot').append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("x", -45)
    .attr("y", 200)
    .text("Goals")
    .style('font-size', '14px')
}


// Helper functions 

function highlight() {
  $(this).css('fill', 'pink')
}

function unHighlight() {
  d3.selectAll('circle').style('fill', '#ddd')
}

function comparePosition(d, i) {
  var positionColor = d3.rgb('pink')

  d3.selectAll('circle').style('fill', function(p) {
    return p.position == d.position ? 'pink' : '#ddd'
  })
}

function displayModal(d) {
  $('.stat-modal').show()
  $('.background-gray').show()
  d3.selectAll('td.data')
    .data([ d3.values(d)[1], d3.values(d)[6] ])
    .html(function(p) {
      return p;
    })
}


$(document).ready( function() {
  $('.close-modal').on('click', function() {
    $('.stat-modal').hide();
    $('.background-gray').hide();
  })
})



