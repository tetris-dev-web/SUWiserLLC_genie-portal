# == Schema Information
#
# Table name: account_types
#
#  id           :integer          not null, primary key
#  account_type :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class AccountType < ApplicationRecord

  has_many :account_types,
    foreign_key: :account_id,
    class_name: "UserAccount"

  has_many :users,
    through: :account_types,
    source: :user
end
