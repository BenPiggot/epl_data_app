class RemoveCleanSheetsFromPlayers < ActiveRecord::Migration
  def change
    remove_column :players, :clean_sheets, :string
  end
end
