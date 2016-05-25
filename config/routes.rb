Rails.application.routes.draw do
  root to: 'sessions#index'

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'

  get '/signup' => 'users#new'
  post '/users' => 'users#create'
  get 'users/:id' => 'users#show', :as => :user

end
