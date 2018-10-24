class UserAccount < ApplicationRecord
  validates :user_id,:account_id, presence: true

  belongs_to :user,
    class_name: "User",
    foreign_key: :user_id

  belongs_to :account,
    class_name: "AccountType",
    foreign_key: :account_id

end
