# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160603174743) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.boolean  "countable",   default: false
  end

  create_table "calendars", force: :cascade do |t|
    t.string   "name"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "calendars", ["user_id"], name: "index_calendars_on_user_id", using: :btree

  create_table "details", force: :cascade do |t|
    t.integer "timebox_id"
    t.text    "notes"
    t.integer "count"
  end

  add_index "details", ["timebox_id"], name: "index_details_on_timebox_id", using: :btree

  create_table "favorites", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "activity_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "favorites", ["activity_id"], name: "index_favorites_on_activity_id", using: :btree
  add_index "favorites", ["user_id"], name: "index_favorites_on_user_id", using: :btree

  create_table "friendships", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "friend_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "timeboxes", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "activity_id"
    t.integer  "time_worked"
    t.integer  "time_breaked"
    t.integer  "total_cycles"
    t.integer  "work_block_time"
    t.integer  "break_block_time"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "timeboxes", ["activity_id"], name: "index_timeboxes_on_activity_id", using: :btree
  add_index "timeboxes", ["user_id"], name: "index_timeboxes_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_foreign_key "calendars", "users"
  add_foreign_key "details", "timeboxes"
  add_foreign_key "favorites", "activities"
  add_foreign_key "favorites", "users"
  add_foreign_key "timeboxes", "activities"
  add_foreign_key "timeboxes", "users"
end
