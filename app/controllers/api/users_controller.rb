class Api::UsersController < ApplicationController

  protect_from_forgery with: :null_session, only: Proc.new { |c| c.request.format.json? }

  before_action :authenticate_user!

  def show
    @resource = User.find_by_id(params[:id])
  end

  def edit
    @resource = current_user
  end


  def update_info
    @resource = current_user

    if @resource.update(user_params)
      bypass_sign_in(@resource)
      render "api/users/show"
    else
      render json: ["Could not update information"], status: 401
    end
  end

  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [:email, :password, :username, :first_name, :last_name, :zipcode, :id])
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :username, :first_name, :last_name, :id, :zipcode, :tokens)
  end

end
