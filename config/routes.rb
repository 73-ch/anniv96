Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "home#pre"

  get "/home" => "home#home"

  get "/pre" => "home#pre"
end
