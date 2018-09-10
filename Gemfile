source 'https://rubygems.org'
ruby '2.4.2'
require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'github-pages', versions['github-pages']

gem 'jekyll', versions['jekyll']
gem 'kramdown', versions['kramdown']
# leaving this commented out to show it's an option
# gem 'rack-jekyll'
gem 'rake', '~> 12.3'
gem 'puma', '~> 3.11', '>= 3.11.2'
