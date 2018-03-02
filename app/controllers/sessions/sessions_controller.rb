# frozen_string_literal: true

class Sessions::SessionsController < Devise::SessionsController
  # protect_from_forgery prepend: true
  protect_from_forgery with: :null_session, only: Proc.new { |c| c.request.format.json? }



  def create
    @resource = User.find_for_database_authentication(email: params[:user][:email])
    return invalid_login_attempt unless @resource

    if @resource.valid_password?(params[:user][:password])
      sign_in :user, @resource
      current_user = @resource
      render "api/users/show"
    else
      invalid_login_attempt
    end
  end

  # GET /resource/sign_in
  def new
    super
  end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  def destroy
    super
  end

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
