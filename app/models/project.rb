# == Schema Information
#
# Table name: projects
#
#  id                :integer          not null, primary key
#  title             :string           not null
#  valuation         :decimal(, )      not null
#  video             :string
#  plan_pdf          :binary
#  icon              :string
#  description       :text
#  creator_id        :integer          not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  file_file_name    :string
#  file_content_type :string
#  file_file_size    :integer
#  file_updated_at   :datetime
#

class Project < ApplicationRecord
  validates :title, :valuation, :creator_id, presence: true
  validates :title, uniqueness: true

  has_attached_file :file, default_url: "missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :creator,
    foreign_key: :creator_id,
    class_name: :User

end
