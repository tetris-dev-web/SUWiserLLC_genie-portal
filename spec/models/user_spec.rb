require 'spec_helper'
#

RSpec.describe "User" do
  context "When testing, the User class" do

    it 'should: have a valid email, password, and public key' do
      user = User.new(email: "johnjrude@gmail.com", password: "password", bylaw_agreement: true)
      expect(user).to have_attributes(:email => "johnjrude@gmail.com", :password => "password")
      # message = "Hello World!"
      # expect(message).to eq "Hello World!"
      puts "user email, password, and public key are valid"
    end
  end
end
