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

  # has_attached_file :file, default_url: "missing.png"
  # # validates_attachment_content_type :file, content_type: /\Aimage\/.*\Z/
  # validates_attachment_content_type :file, content_type: ["image/jpeg", "image/png", "application/pdf","application/vnd.ms-excel",
  #            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  #            "application/msword",
  #            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  #            "text/plain"], message: ", TESTING- That was not a correct file type. -TESTING"

  has_attached_file :document
  validates_attachment :document, :content_type => {:content_type => %w(image/jpeg image/jpg image/png application/pdf application/msword application/vnd.openxmlformats-officedocument.wordprocessingml.document)}

  belongs_to :creator,
    foreign_key: :creator_id,
    class_name: :User

end
