class TimeboxesController < ApplicationController

	def new
    @timebox = Timebox.new
  end

  def create

  end

  def show
		@timebox = Timebox.find(params[:id])
		redirect_to '/' if @timebox.creator != current_user && @timebox.creator != User.find_by(name: "Guest")
	end

	def create
		@guest = User.find_by name: "Guest"
		if current_user
			@user_id = current_user.id
		else
			@user_id = @guest.id
		end
		@timebox = Timebox.new(timebox_params)
		@timebox.user_id = @user_id
		if @timebox.save
			p @timebox
			puts "timebox saves"
			redirect_to @timebox
		else
			p @timebox
			puts "timebox doesn't save"
      flash.notice = "Please select an activity"
			render "timeboxes/new"
		end
	end

	def new
		@timebox = Timebox.new
	end

	def time_info
		@timebox = Timebox.find(params[:id])
		render json: {work_block_time: @timebox.work_block_time, break_block_time: @timebox.break_block_time, activity: @timebox.activity.name, user_name: @timebox.creator.name, countable: @timebox.activity.countable}
	end

	def update
		if request.xhr?
			@timebox = Timebox.find(params[:id])
			@timebox.update_attributes(time_worked: params[:time_worked], time_breaked: params[:time_breaked], total_cycles: params[:total_cycles])
			render {success}
		else
			render "/"
		end
	end

  private

    def timebox_params
      params.require(:timebox).permit(:activity_id, :work_block_time, :break_block_time, time_worked: 0, time_breaked: 0, total_cycles: 0)
    end

end
