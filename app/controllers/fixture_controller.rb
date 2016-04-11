class FixtureController < ApplicationController

  def index
    http = HTTPClient.new
    team_data = http.get_content('http://api.football-data.org/alpha/teams/57/fixtures', nil, {'X-Auth-Token' => '663528934d21408f8a4a638a6511cdb5'})
    @team_data = JSON.parse(team_data)

    p @team_data

    @team_data['fixtures'].each do |f|
      fixture = Fixture.find_or_create_by(date: f['date'])

      fixture.update(away_team: f['awayTeamName'])
      fixture.update(home_team: f['homeTeamName'])
      fixture.update(away_team_goals: f['result']['goalsAwayTeam'])
      fixture.update(home_team_goals: f['result']['goalsHomeTeam'])

      if (f['homeTeamName'] != 'Arsenal FC')
        fixture.update(opponent: f['homeTeamName'])
      else 
        fixture.update(opponent: f['awayTeamName'])
      end
    end

    @fixtures = @team_data['fixtures']
  end 

  def data
    fixture_data = Fixture.all
    respond_to do |format|
      format.json {
        render :json => fixture_data
      }
    end
  end

end