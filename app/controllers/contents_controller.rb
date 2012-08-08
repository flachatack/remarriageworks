class ContentsController < ApplicationController
  def new
 	@content = Content.new
  end

  def show
	@content = Content.find(params[:id])  
  end

  def index
 	@contents = Content.all
  end

  def edit
  end
  
  def create
	@content = Content.new(params[:content])
	if @content.save
		redirect_to :action => "index"
	else
		render 'new'  
	end
  end
  
end
