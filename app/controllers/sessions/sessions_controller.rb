# frozen_string_literal: true

class Sessions::SessionsController < Devise::SessionsController

  # before_action :configure_sign_in_params, only: [:create]

  protect_from_forgery prepend: true

  def create
    # super

    @resource = User.find_for_database_authentication(email: params[:user][:email])
    return invalid_login_attempt unless @resource

    if @resource.valid_password?(params[:user][:password])
      sign_in :user, @resource
      render "api/users/show"
      # return render nothing: true
    else
      # render json: ["Username and/or password was not found"], status: 401
      invalid_login_attempt
    end
  end

  # GET /resource/sign_in
  def new
    # render json: ["Username and/or password was not found"], status: 401
    # super
  end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  protected

  def invalid_login_attempt
    set_flash_message(:alert, :invalid)
    render json: flash[:alert], status: 401
  end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
