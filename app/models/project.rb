# == Schema Information
#
# Table name: projects
#
#  id                :integer          not null, primary key
#  title             :string           not null
#  valuation         :decimal(, )      not null
#  model_id             :string
#  icon              :string
#  description       :text
#  creator_id        :integer          not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  file_file_name    :string
#  file_content_type :string
#  file_file_size    :integer
#  file_updated_at   :datetime
#  revenue              :decimal(, )
#

class Project < ApplicationRecord
  validates :title, :revenue, :valuation, :creator_id, :city, :continent, :latitude, :longitude, presence: true
  validates :title, uniqueness: true

  # has_attached_file :file, default_url: "missing.png"
  # # validates_attachment_content_type :file, content_type: /\Aimage\/.*\Z/
  # validates_attachment_content_type :file, content_type: ["image/jpeg", "image/png", "application/pdf","application/vnd.ms-excel",
  #            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  #            "application/msword",
  #            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  #            "text/plain"], message: ", TESTING- That was not a correct file type. -TESTING"

  has_attached_file :file, default_url: "missing.png"
  validates_attachment :file, :content_type => {:content_type => %w(image/jpeg image/jpg image/png application/pdf application/msword application/json application/vnd.openxmlformats-officedocument.wordprocessingml.document)}

  belongs_to :creator,
    foreign_key: :creator_id,
    class_name: :User

end
