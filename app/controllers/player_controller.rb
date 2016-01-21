require 'flickraw'

FlickRaw.api_key='f4b1ce80af46485e18c007222f6f725b'
FlickRaw.shared_secret='c4461182866476c2'

class PlayerController < ApplicationController

  def index
    @players = Player.all

    http = HTTPClient.new

    team_data = http.get_content('http://api.football-data.org/alpha/teams/57', nil, {'X-Auth-Token' => '663528934d21408f8a4a638a6511cdb5'})
    @team_data = JSON.parse(team_data)
    @market = @team_data['squadMarketValue']

    player_data = http.get_content('http://api.football-data.org/alpha/teams/57/players', nil, {'X-Auth-Token' => '663528934d21408f8a4a638a6511cdb5'} )
    @player_data = JSON.parse(player_data)
    @player_data = @player_data['players']

    @players.each do |player| 
      @player_data.each do |p|
        if (player.name == p['name'] && !player['marketValue'])
         player['marketValue'] = p['marketValue']
        end
      end   
    end
  end

  def create
    @player = Player.create(player_params)
    redirect_to player_index_path
  end

  def show
    p params[:id]
    @player = Player.find(params[:id])

    list = flickr.photos.search :text => @player.name, :sort => "relevance"
    photos = list.map do |i|
       "https:/farm3.static.flickr.com/#{i["server"]}/" "#{i["id"]}_" "#{i["secret"]}_n.jpg"
    end
    @photo = photos.sample
  end


  def edit
    @player = Player.find(params[:id])
    render layout: false
  end

  def update
    @player = Player.find(params[:id])
    @player.update(player_params)
    redirect_to player_index_path
  end

  def destroy
    @player = Player.find(params[:id])
    @player.destroy

    redirect_to player_index_path
  end


  private

  def player_params
    params.require(:player).permit(:name, :age, :nationality, :position)
  end


end