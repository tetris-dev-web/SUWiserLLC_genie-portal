class CreateProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.string :title, null: false
      t.decimal :valuation, null: false
      t.string :video
      t.binary :plan_pdf
      t.string :icon
      t.text :description
      t.integer :creator_id, null: false

      t.timestamps
    end
    add_index :projects, :creator_id
  end
end
