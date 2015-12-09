class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :name
      t.integer :age
      t.string :nationality
      t.string :position
      t.integer :games_played
      t.integer :goals
      t.integer :assists

      t.timestamps null: false
    end
  end
end
