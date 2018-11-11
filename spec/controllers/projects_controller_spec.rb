require 'rails_helper'

RSpec.describe Api::ProjectsController, type: :controller do
  before do
    @expected = -266505
    load "#{Rails.root}/db/seeds.rb"
    get :deployed_project_revenue, format: :json


  end

  describe 'GET #deployed_project_revenue' do

    # it "should be the nadir" do
    #   expect(response.body.to_i).to eq(@expected)
    # end

    it "should show the sum of all the accumulated cashflows" do
      expect(response.body.to_i).to eq (608402)
    end
  end


end
