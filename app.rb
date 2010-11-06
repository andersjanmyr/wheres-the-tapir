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
  Stats.get(status)
  status.to_json
end

get '/stats' do
  Stats.get.to_json
end
