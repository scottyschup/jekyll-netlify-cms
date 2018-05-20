source 'https://rubygems.org'
ruby '2.4.2'
require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'github-pages', versions['github-pages']

gem 'jekyll', '~> 3.7.3' # version needed for gh pages
gem 'kramdown', '~> 1.11', '>= 1.11.1'
# leaving this commented out to show it's an option
# gem 'rack-jekyll'
gem 'rake', '~> 12.3'
gem 'puma', '~> 3.11', '>= 3.11.2'
