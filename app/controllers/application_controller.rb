class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception

  # protect_from_forgery with: :null_session

  protect_from_forgery prepend: true

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) do |user|
      user.permit(:email, :password, :username, :bylaw_agreement)
    end

    devise_parameter_sanitizer.permit(:sign_in) do |user|
      user.permit(:email, :password)
    end

    devise_parameter_sanitizer.permit(:account_update) do |user|
      user.permit(:id, :email, :password, :username, :first_name, :last_name, :zipcode)
    end
  end

end
