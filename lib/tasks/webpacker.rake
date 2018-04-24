Rake::Task["webpacker:yarn_install"].clear

namespace :webpacker do
  desc "Skip default webpacker yarn install"
  task :yarn_install do
    puts "Skipping webpacker yarn install"
  end
end