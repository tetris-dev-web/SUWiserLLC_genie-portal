#
# USE Api::UsersController for password_update
# class Users::RegistrationsController < Devise::RegistrationsController
#
#   # before_action :configure_account_update_params, only: [:update]
#   before_action :authenticate_user!
#
#
#   def update_password
#     # super
#     @resource = User.find(current_user.id)
#
#     if @resource.update(user_params)
#       bypass_sign_in(@resource)
#       render "api/users/show"
#     else
#       render json: ["Could not update information"], status: 401
#     end
#   end
#
#
#   # # set to bool
#   # email_changed = @user.email != params[:user][:email]
#   # # reset the password if user.password is anything but empty
#   # password_changed = !params[:user][:password].empty?
#   # username_changed = @user.username != params[:user][:username]
#   # first_name_changed = @user.first_name != params[:user][:first_name]
#   # last_name_changed = @user.last_name != params[:user][:last_name]
#   #
#   # debugger
#   #
#   # if email_changed || password_changed || username_changed || first_name_changed || last_name_changed
#   #   debugger
#   #   # @user.update_with_password(params[:user])
#   #   update_resource(@user, params[:user])
#   # else
#   #   debugger
#   #   @user.update_without_password(params[:user])
#   # end
#   #
#   # debugger
#   # if successfully_updated
#   #   # bypass validation and sign in user
#   #   # original from StackOverFlow
#   #   # sign_in @user, :bypass => true
#   #
#   #   # send to show page
#   #   debugger
#   #   sign_in :user, @resource, :bypass => true
#   #   render "api/users/show"
#   # else
#   #   # render edit
#   #   render json: ["Could not update information"], status: 401
#
#
#   #   def configure_sign_up_params
#   #     devise_parameter_sanitizer.permit(:sign_up, keys: [:bylaw_agreement])
#   #   end
#   # end
#
#   # Add any extra columns to the strong params for UPDATING here: (password)
#   # If you have extra params to permit, append them to the sanitizer.
#   # UNCOMMENT BELOW
#   def configure_account_update_params
#     devise_parameter_sanitizer.permit(:account_update, keys: [:email, :password, :username, :first_name, :last_name])
#   end
#
#   private
#
#   def user_params
#     params.require(:user).permit(:email, :password, :username, :first_name, :last_name, :id, :zipcode)
#   end
#
# end
