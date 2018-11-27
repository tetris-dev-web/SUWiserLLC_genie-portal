# == Schema Information
#
# Table name: user_accounts
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  account_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UserAccount < ApplicationRecord
  validates :user_id,:account_id, presence: true

  belongs_to :user,
    class_name: "User",
    foreign_key: :user_id

  belongs_to :account,
    class_name: "AccountType",
    foreign_key: :account_id

end
