class StatisticController < ApplicationController

  def index
    http = HTTPClient.new

    statistics = http.get_content('http://jokecamp.github.io/epl-fantasy-geek/js/data.json')

    @statistics = JSON.parse(statistics)
    @data = @statistics['elInfo']
    @meta_data = @statistics['elStat']

    @data.shift()

    arr = []
    @meta_data.each do |key, val|
     arr << val
    end

    arr = arr.sort()

    @arr = arr.map do |val|
      (val > 17 ) ? val -= 4 : val
    end

    @data_head = {}

    @arr.each do |idx| 
      @meta_data.each do |key, val|
        if (val == idx)
          @data_head[idx] = key
        end
      end
    end

    @data = @data.map do |val|
      val.each_with_index do |v, i|
        if (i > 16 && i < 21 || i > 50)
          val.delete_at(i)
        end
      end
    end

    new_header = @data_head.flatten.reject{ |n| n.is_a? Integer }
    @data.unshift(new_header)

    @counter = arr.length

  end
    

end