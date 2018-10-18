class AccountType < ApplicationRecord

  has_many :account_types,
    foreign_key: :account_id,
    class_name: "UserAccount"

  has_many :users,
    through: :account_types,
    source: :user
end
