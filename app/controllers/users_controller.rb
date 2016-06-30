class UsersController < ApplicationController

  def new
  end

  def show
    @user = User.find(params[:id])
  end

  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      activities = Activity.limit(5)
      activities.each do |activity|
        Favorite.create(user_id: user.id, activity_id: activity.id)
        end
      redirect_to '/'
    else
      @errors = user.errors.full_messages
      flash.notice = "Registration failed. Please try again."
      render '/users/new'
    end
  end

  def data
    user = User.find_by_id(session[:user_id])
    timeWorked = 0
    timeBreaked = 0
    timeCycles = 0
    activityHash = {} 
    activityArray = []
    
    p user.timeboxes.count
    if user.timeboxes.count > 0
      user.timeboxes.each do |timebox|
        p "time worked #{timebox.time_worked}"
        timeWorked += timebox.time_worked
        p "time breaked #{timebox.time_breaked}"
        timeBreaked += timebox.time_breaked
        timeCycles += timebox.total_cycles
        if activityHash[timebox.activity.name]
          activityHash[timebox.activity.name] += 1
        else
          activityHash[timebox.activity.name] = 1
        end
      end
      p activityHash
      activityHash.each do |activity, count|
        p activity
        p count
        activityArray.push([activity, count])
      end
      p activityArray
    end
    render json: { timeWorked: timeWorked, timeBreaked: timeBreaked, timeCycles: timeCycles, activityArray: activityArray }

  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end