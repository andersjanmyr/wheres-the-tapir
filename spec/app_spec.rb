# encoding: UTF-8
require File.expand_path('../spec_helper', __FILE__)
require 'app'
require 'json'

describe 'Wheres the Tapir' do

  def app
    Sinatra::Application
  end

  it "get / redirects to /index.html" do
    get '/'
    follow_redirect!
    last_response.should be_ok
    last_request.env['PATH_INFO'].should == '/index.html'
  end

  describe "post /quiz" do
    before :all do
      post '/quiz'
    end

    it 'should be ok' do
      last_response.should be_ok
    end

    it "should return an id for the quiz" do
      last_response.body.should match(/\d+/)
    end
  end

  describe 'put /quiz/:quiz/select/:door' do
    before do
      post '/quiz'
      @id = last_response.body
    end

    it 'should return a door other than the one I selected' do
      put "/quiz/#{@id}/select/1"
      %(2 3).should include(last_response.body)
    end
  end

end

