class ChangeFriendshipTableToIncludeUserIdAndFriendId < ActiveRecord::Migration
  def change
  	change_table :friendships do |t|
  		t.rename :friend01_id, :user_id
  		t.rename :friend02_id, :friend_id
  	end
  end
end
