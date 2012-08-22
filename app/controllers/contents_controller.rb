class ContentsController < ApplicationController
before_filter :require_admin, :except => [:new, :update, :create, :destroy, :edit]
  
  def manager_console
	@contents = Content.all
  end

  def new
   @breadcrumbs += " > New Content"
 	@contents = Content.new
  end

  def show
	@contents = Content.find(params[:id])  
   @breadcrumbs += " > Content > " + @content.title.to_s
  end

  def index
   parameter = params[:content_type]
   @breadcrumbs += " > Content > " + parameter.to_s
   @contents = []
	preFind = Content.find_all_by_content_type(parameter)
 	if !(preFind == nil)
 		@contents = preFind
 	end		 	
  end

  def edit
  	@contents = Content.find(params[:id])  	
  end
  
  def update
    @contents = Content.find(params[:id])
    @contents.body = params[:body]
    if (@content.update_attributes(params[:content]))
		redirect_to :action => "show", :id => @content.id
    else
      render 'edit'
    end
  end
  
  def create
	@contents = Content.new(params[:content])
	@contents.body = params[:body]	
	if @contents.save
		redirect_to :action => "show", :id => @content.id
	else
		render 'new'  
	end
  end
  
  def destroy
	  Content.find(params[:id]).destroy
     redirect_to :root
  end
    
end
