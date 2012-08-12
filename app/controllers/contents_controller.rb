class ContentsController < ApplicationController
  
  def new
   @page_head = "New Content"
 	@content = Content.new
  end

  def show
   @page_head = "Content #" + params[:id]
	@content = Content.find(params[:id])  
  end

  def index
   @page_head = "All Content"
   parameter = params[:content_type]
   @contents = []
	preFind = Content.find_by_content_type(parameter)
 	if preFind != nil
 		@contents = preFind
 	end		 	
  end

  def edit
  end
  
  def create
	@content = Content.new(params[:content])
	@content.body = params[:body]
	
	if @content.save
		redirect_to :action => "index"
	else
		render 'new'  
	end
  end
  
end
