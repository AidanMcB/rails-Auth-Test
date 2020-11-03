class UsersController < ApplicationController
    def home
        render json: {status: "It is working"}
    end 
    
    def index
        users = User.all
        render json: users
    end 

end