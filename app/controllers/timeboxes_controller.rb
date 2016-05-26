class TimeboxesController < ApplicationController

	def show
		@timebox = Timebox.find(params[:id])
		redirect_to '/' if @timebox.creator != current_user
	end

end
