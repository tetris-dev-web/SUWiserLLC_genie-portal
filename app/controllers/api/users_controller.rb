class Api::UsersController < ApplicationController

  def show
    @resource = User.find_by_id(params[:id])
  end

  before_action :authenticate_user!


  def update_password
    debugger
    @resource = User.find(current_user.id)

    debugger
    if @resource.update(user_params)
      debugger
      bypass_sign_in(@resource)
      render "api/users/show"
    else
      render json: ["Could not update information"], status: 401
    end
  end

  # def update
  #   @user = User.find(params[:id])
  #   if @user.update(user_params)
  #     render 'api/users/show'
  #   else
  #     render json: @user.errors.full_messages, status: 422
  #   end
  # end
  #
  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [:email, :password, :username, :first_name, :last_name])
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :username, :first_name, :last_name, :id, :zipcode)
  end

end
