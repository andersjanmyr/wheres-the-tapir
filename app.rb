# encoding: UTF-8
require 'rubygems'
require 'sinatra'
require 'json'
require './quiz'

set :public, "./public"

configure(:development) do |c|
  require "sinatra/reloader"
  c.also_reload "*.rb"
end

enable :run

get "/" do
  redirect 'index.html'
end

post "/quiz" do
  Quiz.new.quiz_id.to_s
end


put "/quiz/:quiz/select/:door" do |quiz, door|
  quiz = Quiz.quizzes[quiz.to_i]
  quiz.remove_door(door).to_s
end

post "/quiz/*/*" do |quiz, stick_or_switch|
  quiz = Quiz.quizzes[quiz.to_i]
  quiz.choose(stick_or_switch)
  status = quiz.status
  update_stats(status)
  status.to_json
end

get '/stats' do
  stats.to_json
end

helpers do
  $stick_count = 0
  $stick_correct_count = 0
  $switch_count = 0
  $switch_correct_count = 0

  def update_stats status
    if status[:choice] == 'stick'
      $stick_count += 1
      $stick_correct_count += 1 if status[:correct]
    else
      $switch_count += 1
      $switch_correct_count += 1 if status[:correct]
    end
    stats(status)
  end

  def stats(hash={})
    hash[:stick] = [$stick_correct_count, $stick_count]
    hash[:switch] = [$switch_correct_count, $switch_count]
    hash
  end
end
