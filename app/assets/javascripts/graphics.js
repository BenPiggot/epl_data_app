$(document).ready(function(){
  $('.see-data').on('click', function() {

    $.ajax({
       type: "GET",
       contentType: "application/json; charset=utf-8",
       url: '/statistic/data',
       dataType: 'json',
       success: function (data) {
         bubbleChart(data)
       }
    })
  })
})


var bubbleChart = function(payload) {

  var json = { "players": {} };

  payload.forEach( function(player) {
    if (player.goals > 0) {
      json.players[player.name] = player.goals
    }
  })
  

  var diameter = 900;

  var svg = d3.select('#graph').append('svg')
          .attr('width', diameter)
          .attr('height', diameter);

  var bubble = d3.layout.pack()
        .size([diameter, diameter])
        .value(function(d) {return d.size;})
        .padding(3);

  // generate data with calculated layout values
  var nodes = bubble.nodes(processData(json))
            .filter(function(d) { return !d.children; }); // filter out the outer bubble
 
  var vis = svg.selectAll('g')
          .data(nodes)
          .enter().append('g')
  
  vis.append('circle')
      .attr('transform', function(d) { 
        return 'translate(' + (d.x) + ',' + d.y + ')'; 
      })
      .attr('r', function(d) { return d.r; })
      .attr('class', function(d) { return d.className; });

  vis.append('text')  
      .attr('transform', function(d) { return 'translate(' + (d.x - 80)+ ',' + (d.y) + ')'; })
      .style("font-family", "Helvetica Neue")
      .style("color", "black")
      .style('font-size', '1rem')
      .text(function(d){
        var goalText = d.size == 1 ? ' goal' : ' goals'
        return d.name + ', ' + d.size + goalText
      })
  
  function processData(data) {
    var obj = data.players;

    var newDataSet = [];

    for(var prop in obj) {
      newDataSet.push({name: prop, className: prop.toLowerCase(), size: obj[prop]});
    }
    return {children: newDataSet};
  }
  
}





