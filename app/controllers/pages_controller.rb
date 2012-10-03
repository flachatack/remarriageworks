class PagesController < ApplicationController

  
  def home
  	respond_to do |format|
        format.js 
        format.html {}
        format.json {  }
        format.xml  { head :ok }
      end
  end


  
  
  
end
