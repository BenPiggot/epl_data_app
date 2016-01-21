class FixtureController < ApplicationController

  def index
    http = HTTPClient.new
    team_data = http.get_content('http://api.football-data.org/alpha/teams/57/fixtures', nil, {'X-Auth-Token' => '663528934d21408f8a4a638a6511cdb5'})
    @team_data = JSON.parse(team_data)
    @fixtures = @team_data['fixtures']
  end

end