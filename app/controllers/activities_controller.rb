class ActivitiesController < ApplicationController

  def new
    @activity = Activity.new
  end

  def create
    @activity = Activity.new(activity_params)
    if @activity.save
      redirect_to '/timeboxes/new'
    else
      @errors = @activity.errors.full_messages
      flash.notice = "You must add an activity name."
      render '/activities/new'
    end
  end

  private

    def activity_params
      params.require(:activity).permit(:name, :description)
    end
end