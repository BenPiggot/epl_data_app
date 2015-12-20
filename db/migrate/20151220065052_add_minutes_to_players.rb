class AddMinutesToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :minutes, :integer
  end
end
