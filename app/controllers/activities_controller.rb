class ActivitiesController < ApplicationController

  before_filter :authorize
  
  def index
    @activities = Activity.all
    @favorites = Favorite.where(user_id: current_user.id)
  end
  def new
    @activity = Activity.new
  end

  def create
    @activity = Activity.new(activity_params)
    if @activity.save
      Favorite.create(user_id: current_user.id, activity_id: @activity.id)
      redirect_to '/activities'
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