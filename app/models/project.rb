# == Schema Information
#
# Table name: projects
#
#  id                :integer          not null, primary key
#  title             :string           not null
#  valuation         :decimal(, )      not null
#  model_id          :string
#  icon              :string
#  description       :text
#  creator_id        :integer          not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  file_file_name    :string
#  file_content_type :string
#  file_file_size    :integer
#  file_updated_at   :datetime
#  revenue           :decimal(, )
#  city              :string
#  country           :string
#  continent         :string
#  status            :string
#  bus_plan_link     :string
#  sketch_link       :string
#  cashflow          :jsonb
#  start_date        :date
#  latitude          :decimal(10, 6)
#  longitude         :decimal(10, 6)
#  summary           :string
#  capital_required  :float
#  current_capital   :float
#  close_date        :datetime
#  votes             :jsonb
#

class Project < ApplicationRecord
  validates :title, :revenue, :valuation, :description, :capital_required, :creator_id, :city, :continent, presence: true
  validates :title, uniqueness: true

  # # validates_attachment_content_type :file, content_type: /\Aimage\/.*\Z/
  # validates_attachment_content_type :file, content_type: ["image/jpeg", "image/png", "application/pdf","application/vnd.ms-excel",
  #            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  #            "application/msword",
  #            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  #            "text/plain"], message: ", TESTING- That was not a correct file type. -TESTING"

  # has_attached_file :file, default_url: "missing.png"
  # validates_attachment :file, :content_type => {:content_type => %w(image/jpeg image/jpg image/png application/pdf application/msword application/json application/vnd.openxmlformats-officedocument.wordprocessingml.document)}

  belongs_to :creator,
    foreign_key: :creator_id,
    class_name: :User

  has_one_attached :pdf_file
end
