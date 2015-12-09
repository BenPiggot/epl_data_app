class StatisticController < ApplicationController


  def psql_data data, num=2
    psql_array = []

    if (num < 2 || !(data.kind_of?(Array)) )
      raise 'Invalid input' 
    end

    data[1..num].each do |d|
      psql_array << Hash[data[0].zip(d)]
    end

    return psql_array
  end



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

    for_db = psql_data(@data, 30)

    Player.all.each do |p|
      for_db.each do |d|
        temp = d['first_name'] + " " + d['second_name']
        if (p.name == temp)
          name = p.name
          player = Player.find_by name: name
          player.update(goals: d['goals_scored'])
          player.update(assists: d['assists'])
        end
      end
    end

  end
    

end