class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :header
  
    
  def header
    	@breadcrumbs = "Home"
  end
  
end
