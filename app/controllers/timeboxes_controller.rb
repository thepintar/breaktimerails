class TimeboxesController < ApplicationController

	def new
    @timebox = Timebox.new
  end

  def create
  end
  def show
		@timebox = Timebox.find(params[:id])
		redirect_to '/' if @timebox.creator != current_user
	end

end
