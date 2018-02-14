# == Schema Information
#
# Table name: projects
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  valuation   :decimal(, )      not null
#  video       :string
#  plan_pdf    :binary
#  icon        :string
#  description :text
#  creator_id  :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Project < ApplicationRecord
  validates :title, :valuation, :creator_id, presence: true
  validates :title, uniqueness: true

  belongs_to :creator,
    foreign_key: :creator_id,
    class_name: :User

end
