source 'https://rubygems.org'
ruby '2.4.2'

gem 'jekyll', '~> 3.8.3'
# leaving this commented out to show it's an option
# gem 'rack-jekyll'
# This is the default theme for new Jekyll sites. You may change this to anything you like.
gem "minima", "~> 2.0"

gem 'rake', '~> 12.3'
gem 'puma', '~> 3.11', '>= 3.11.2'

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0" if Gem.win_platform?
