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
      data.sort(function(a, b) { return a.id - b.id })
      makeLineChart(data, data[0].id)
    }
  })
})

function makeLineChart(data, id) {
  var xScale = d3.scale.linear().domain([0, data.length ]).range([0, 750]);
  var yScale = d3.scale.linear().domain([0, 7]).range([360, 0]);

  var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient('bottom')

  d3.select('#linechart').append('g').attr('id', 'xAxis2').call(xAxis);

  var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient('left')

  d3.select('#linechart').append('g').attr('id', 'yAxis2').call(yAxis);

  d3.selectAll('#xAxis2').attr('transform', 'translate(0, 360)');
  d3.selectAll('path.domain').style('fill', 'none').style('stroke', 'black');

  d3.select('#linechart').append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", 400)
    .attr("y", 405)
    .text("Matchday, 2016-17 Season")
    .style('font-size', '14px')

  d3.select('#linechart').append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("x", -45)
    .attr("y", 200)
    .text("Goals")
    .style('font-size', '14px')

  var drawLines = d3.svg.line()
        .x(function(d) { 
          return xScale(d.id - id) 
        })
        .y(function(d) { 
          if (d.home_team == 'Arsenal FC') {
            var goals = d.home_team_goals == -1 ? 0 : d.home_team_goals;
            return yScale(goals)
          } else {
            var goals = d.away_team_goals == -1 ? 0 : d.away_team_goals;
            return yScale(goals)
          }
        });

  var drawLinesOpponent = d3.svg.line()
        .x(function(d) {
          return xScale(d.id - id)
        })
        .y(function(d) {
          if (d.home_team != 'Arsenal FC') {
            var goals = d.home_team_goals == -1 ? 0 : d.home_team_goals;
            return yScale(goals)
          } else {
            var goals = d.away_team_goals == -1 ? 0 : d.away_team_goals;
            return yScale(goals)
          }
        });

  var arsenalArea = d3.svg.area()
        .x(function(d) {
          return xScale(d.id - id)
        })
        .y(function(d) {
          if (d.home_team == 'Arsenal FC') {
            var goals = d.home_team_goals == -1 ? 0 : d.home_team_goals;
            return yScale(goals)
          } else {
            var goals = d.away_team_goals == -1 ? 0 : d.away_team_goals;
            return yScale(goals)
          }
        })
        .y0(function(d) {
          return yScale(0)
        })
        .interpolate("cardinal");


  var opponentArea = d3.svg.area()
        .x(function(d) {
          return xScale(d.id - id)
        })
        .y(function(d) {
          if (d.home_team != 'Arsenal FC') {
            var goals = d.home_team_goals == -1 ? 0 : d.home_team_goals;
            return yScale(goals)
          } else {
            var goals = d.away_team_goals == -1 ? 0 : d.away_team_goals;
            return yScale(goals)
          }
        })
        .y0(function(d) {
          return yScale(0)
        })
        .interpolate("cardinal");

  drawLines.interpolate("cardinal");
  drawLinesOpponent.interpolate("cardinal");

  d3.select('#linechart')
      .append('path')
      .attr('d', drawLines( data.sort( function(a, b) { return new Date(a.date) - new Date(b.date); })) )
      .attr('fill', 'none')
      .attr('stroke', '#EF0107')
      .attr('stroke-width', 2);

  d3.select('#linechart')
      .append('path')
      .attr('d', drawLinesOpponent( data.sort( function(a, b) { return new Date(a.date) - new Date(b.date); })) )
      .attr('fill', 'none')
      .attr('stroke', '#bbb')
      .attr('stroke-width', 2);

  d3.select('#linechart')
      .append('path')
      .attr('d', arsenalArea( data.sort( function(a, b) { return new Date(a.date) - new Date(b.date); })) )
      .attr('fill', '#EF0107')
      .attr('stroke', '#EF0107')
      .attr('stroke-width', 2)
      .style('opacity', 0.5);

  d3.select('#linechart')
      .append('path')
      .attr('d', opponentArea( data.sort( function(a, b) { return new Date(a.date) - new Date(b.date); })) )
      .attr('fill', '#bbb')
      .attr('stroke', '#bbb')
      .attr('stroke-width', 2)
      .style('opacity', 0.5)

}



function makeCharts(data) {
  var plot =  d3.select('#scatterplot')
    .selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('transform', function(d) {
      return "translate(" + (d.minutes/4) + "," + (360 - (d.goals * 30)) + ")";
    })

  plot.append('circle')
    .attr('r', function(d) { return d.goals * 5 })
    .attr('fill', '#ddd')
    .on('mouseover', comparePosition)
    .on('mouseout', unHighlight)
    .on('click', displayModal)

  plot.append('text')
    .text(function(d) { if (d.goals > 0) return d.name })
    .attr('transform', 'translate(-32, 0)')
    .style('font-size', '11px')

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

function averageGoals(data) {
  var goals = data.map( function(d) {
    if (d.home_team == 'Arsenal FC')
      return d.home_team_goals
    else 
      return d.away_team_goals
  })

  for (var i = goals.length; i > 0; i--) {
    if (goals[i] == -1) {
      goals.splice(i, 1)
    }
  }

  return goals.reduce( function(prev, curr) {
    return prev + curr;
  })/goals.length;
}

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



