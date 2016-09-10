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

    statistics = http.get_content('http://jokecamp.github.io/epl-fantasy-geek/js/static-data.json')
    @statistics = JSON.parse(statistics)
    @data = @statistics['elements']

    Player.all.each do |p|
      @data.each do |d|
        temp = d['second_name']
        if (p.name.split(' ')[1] == temp)
          name = p.name
          player = Player.find_by name: name
          player.update(goals: d['goals_scored'])
          player.update(assists: d['assists'])
          player.update(minutes: d['minutes'])
          player.update(clean_sheets: d['clean_sheets'])
          player.update(saves: d['saves'])
          player.update(goals_conceded: d['goals_conceded'])
        end
      end
    end

    @players = Player.all
  end
  

  def data
    players_data = Player.all
    respond_to do |format|
      format.json {
        render :json => players_data
      }
    end
  end

end