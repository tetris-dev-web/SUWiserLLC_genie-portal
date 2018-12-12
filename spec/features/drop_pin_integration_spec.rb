require 'spec_helper'

describe "GET '/#/login' - Genie Portal", type: :feature do
  it 'has a log in form' do
    visit('/#/login')
    save_and_open_page
    expect(page.body).to include("Genus")
    puts " cool, 'Genus' is there "
  end

  # it 'has a greeting form with a user_name field' do
  #   visit 'http://localhost:3000/#/login'
  #
  #   expect(page).to have_selector("form")
  #   expect(page).to have_field(:user_name)
  # end
end
