Rails.application.routes.draw do
  root to: "static#home"
  resources :users
  resources :sessions
  resources :registrations, only: [:create]
  # delete :logout, to: "sessions#logout"

  resources :products, only: [:index, :create, :delete]
  resources :comments, only: [:index, :create]

  post '/logout' => 'sessions#logout'

  get '/products' => "products#index"
  get '/logged_in' => "sessions#logged_in"
  post '/registrations' => "registrations#create"
  post '/sessions' => "sessions#create"
  get '/comments' => "comments#index"
  get '/users' => "users#home"
  post '/comments' => "comments#create"
end
