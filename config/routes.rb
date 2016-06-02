Rails.application.routes.draw do
  root to: 'sessions#index'

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'

  get '/signup' => 'users#new'
  post '/signup' => 'users#create'

  post '/activity' => 'activities#create'

  resources :users
  resources :friendships
  resources :timeboxes
  resources :activities

  get '/timeboxes/:id/info' => 'timeboxes#time_info'

end
