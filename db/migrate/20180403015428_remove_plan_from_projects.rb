class RemovePlanFromProjects < ActiveRecord::Migration[5.1]
  def change
    remove_column :projects, :plan_pdf
  end
end
