require 'rails_helper'

RSpec.describe Api::ProjectsController, type: :controller do

  describe 'GET #deployed_project_revenue' do

    load "#{Rails.root}/db/seeds.rb"
    
    before do
      @expected = -266505
      get :deployed_project_revenue, format: :json
    end

    # it "should be the nadir" do
    #   expect(response.body.to_i).to eq(@expected)
    # end

    it "should show the sum of all the accumulated cashflows" do
      expect(response.body.to_i).to eq (608402)
    end
  end


  describe  'Get #discount_factor' do
    before do
      get :discount_factor, format: :json
    end

    it "should be between 10% and 50%" do
      expect(response.body.to_i).to be_between(10, 50)
    end
  end


end
