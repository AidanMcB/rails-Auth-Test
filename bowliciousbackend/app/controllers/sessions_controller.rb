class SessionsController < ApplicationController
    include CurrentUserConcern

    def create
        user = User.find_by(email: params["user"]["email"])
          
        if user && user.authenticate(params["user"]["password"])
            session[:user_id] = user.id
            render json: {
                status: :created,
                logged_in: true,
                user: user
            }
        else
            render json: { status: 401 }
        end 
    end 

    def logged_in
        # byebug
        if session[:user_id]
            user = User.find(session[:user_id])
            render json: {
                logged_in: true,
                user: user
            }
        else
            render json: {
                logged_in: false
            }
        end
    end

    def logout
        # byebug
        session.clear
        session[:user_id] = nil
        render json: { status: 200, logged_out: true, session: session }
    end
end 