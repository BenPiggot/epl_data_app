class CreateFixtures < ActiveRecord::Migration
  def change
    create_table :fixtures do |t|
      t.datetime :date
      t.string :opponent
      t.string :home_team
      t.string :away_team
      t.integer :home_team_goals
      t.integer :away_team_goals

      t.timestamps null: false
    end
  end
end
