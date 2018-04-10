# frozen_string_literal: true

class Sessions::RegistrationsController < Devise::RegistrationsController

  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  def new
    super
  end

  # POST /resource
  def create
    super
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   # super
  #   debugger
  #   @user = User.find(current_user.id)
  #   # set to bool
  #   email_changed = @user.email != params[:user][:email]
  #   # reset the password if user.password is anything but empty
  #   password_changed = !params[:user][:password].empty?
  #   username_changed = @user.username != params[:user][:username]
  #   first_name_changed = @user.first_name != params[:user][:first_name]
  #   last_name_changed = @user.last_name != params[:user][:last_name]
  #
  #   if email_changed || password_changed || username_changed || first_name_changed || last_name_changed
  #     @user.update_with_password(params[:user])
  #   else
  #     @user.update_without_password(params[:user])
  #   end
  #
  #   if successfully_updated
  #     # bypass validation and sign in user
  #     # original from StackOverFlow
  #     # sign_in @user, :bypass => true
  #
  #     # send to show page
  #     sign_in :user, @resource, :bypass => true
  #     render "api/users/show"
  #   else
  #     # render edit
  #     render json: ["Could not update information"], status: 401
  #   end
  #
  #
  # end

  # DELETE /resource
  def destroy
    debugger
    super
  end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  protected

  # Add any extra columns to the strong params HERE: (bylaw_agreement)
  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
    devise_parameter_sanitizer.permits(:sign_up, keys: [:bylaw_agreement])
  end

  # Add any extra columns to the strong params for UPDATING here: (password)
  # If you have extra params to permit, append them to the sanitizer.
  # UNCOMMENT BELOW
  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [:email,
      :password, :username, :first_name, :last_name])
    end

    # The path used after sign up.
    # def after_sign_up_path_for(resource)
    #   super(resource)
    # end

    # The path used after sign up for inactive accounts.
    # def after_inactive_sign_up_path_for(resource)
    #   super(resource)
    # end
  end
