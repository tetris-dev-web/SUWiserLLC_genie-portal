class Api::User < ApplicationRecord
  # has_many :projects

  validates_acceptance_of :bylaw_agreement, presence: { message: "Please " }

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

end
