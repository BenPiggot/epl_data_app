class AddMarketValueToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :marketValue, :string
  end
end
