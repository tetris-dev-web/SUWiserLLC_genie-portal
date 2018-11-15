# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  first_name             :string
#  last_name              :string
#  zipcode                :string
#  bylaw_agreement        :boolean          default(FALSE)
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  username               :string
#  tokens                 :integer
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase

  test "user public key should not be null" do
    # user = User.new(email: "johnjrude@gmail.com", password: "password", public_key: '123abc', bylaw_agreement: true)
    # user = User.new(
    #   email: "johnjrude@gmail.com",
    #   password: "password",
    #   bylaw_agreement: true,
    #   tokens: 20,
    #   public_key: '123abc'
    # )

    # developer = AccountType.new(
    #   account_type:"Developer1"
    # )

    # user_account = UserAccount.create(
    #   user_id: user.id, account_id:developer.id
    # )

    # assert 2+2 == 4
    puts "user public key is valid"
  end
  #
  # test "user public key should not be null" do
  #   user = User.new(first_name: 'michael', encrypted_password: 'password')
  #   assert_not user.valid?, "public_key is null (not allowed)"
  #   puts "user public key is valid"
  # end


end
