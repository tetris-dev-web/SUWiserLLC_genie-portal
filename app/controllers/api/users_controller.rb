class Api::UsersController < ApplicationController

  def show
    @user = User.find_by_id(params[:id])
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
  # private
  #
  # def user_params
  #   params.require(:user).permit(
  #   :email, :password, :username,
  #   :bylaw_agreement, :first_name,
  #   :last_name, :zipcode)
  # end

end
