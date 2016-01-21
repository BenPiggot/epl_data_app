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

  var maxValue = d3.max(data, function(d) {return d.assists})

  var colorRamp = d3.scale.linear()
                  .domain([0, maxValue])
                  .interpolate(d3.interpolateHsl)
                  .range(['white', 'red'])


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
  $('.modal').show()
  $('.background-gray').show()
  d3.selectAll('td.data')
    .data([ d3.values(d)[1], d3.values(d)[6] ])
    .html(function(p) {
      return p;
    })
}


$(document).ready( function() {
  $('.close-modal').on('click', function() {
    $('.modal').hide();
    $('.background-gray').hide();
  })
})



