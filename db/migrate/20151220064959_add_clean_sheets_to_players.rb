class AddCleanSheetsToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :clean_sheets, :integer
  end
end
