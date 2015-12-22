$(document).ready(function(){
  $('.see-data').on('click', function() {

    $.ajax({
       type: "GET",
       contentType: "application/json; charset=utf-8",
       url: '/statistic/data',
       dataType: 'json',
       success: function (data) {
         var div = document.createElement('div');
         div.innerText = data
         $('#canvas').append(div)
         $(location).attr('href', '/statistic/data');
       }
    })
  })
})

d3.select('#graph')
  .html("First!");