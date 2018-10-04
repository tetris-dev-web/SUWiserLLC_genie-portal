class AddVotesToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :votes, :jsonb
  end
end
