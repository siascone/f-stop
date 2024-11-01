class Api::SessionsController < ApplicationController
    def show
        @user = current_user
        if @user
            render 'api/users/show'
        else
            render json: { user: nil }
        end
    end

    def create
        credential = params[:credential]
        password = params[:password]

        @user = User.find_by_credentials(credential, password)

        if @user
            login!(@user)
            render 'api/users/show'
        else
            render json: { errors: ['The provided credentials were invalid.']}, status: :unauthorized
        end

    end

    def destroy
        @user = current_user

        if @user
            logout!()
            render json: { message: 'Logout Successful' }, status: 200
        else
            render json: {message: 'No one to logout'}, status: 200
        end
    end 
end
