class UserSessionsController < ApplicationController
  def new
  @test = "controller test"
  	@user = User.new
  	respond_to do |format|
        format.js 
        format.html { redirect_to @user }
        format.json { render :json => @user }
        format.xml  { head :ok }
      end
  end

  def create
	 respond_to do |format|
      if @user = login(params[:username],params[:password], params[:remember])
        format.html { redirect_back_or_to(:users, :notice => 'Login successful.') }
        format.xml { render :xml => @user, :status => :created, :location => @user }
      else
        format.html { flash.now[:alert] = "Login failed."; render :action => "new" }
        format.xml { render :xml => @user.errors, :status => :unprocessable_entity }
      end
    end
  end

  def destroy
	 logout
    redirect_to(:users, :notice => 'Logged out!')
  end
end
