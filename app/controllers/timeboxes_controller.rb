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

	def create
		@timebox = Timebox.new(user_id: current_user.id, activity: Activity.find(1), work_block_time: 1, break_block_time: 1, time_worked: 0, time_breaked: 0, total_cycles: 0)
		if @timebox.save
			redirect_to @timebox
		else
			render "timeboxes/new"
		end
	end

	def new
		@timebox = Timebox.new
	end


end
