$LOAD_PATH.unshift File.dirname(__FILE__) + '/..'

require 'bundler'
Bundler.require

require 'rspec'
require 'rack/test'

Rspec.configure do |c|
  c.include Rack::Test::Methods
  c.mock_with :rspec
end
