class GraphicController < ApplicationController

  def index
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