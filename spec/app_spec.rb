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
    
    it "should return 1, 2 or 3" do
      post '/quiz'
      last_response.should be_ok
      %w(1 2 3).should include(last_response.body)
    end    
  end

end

