# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Camera.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('cameras')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'Demo-lition', 
    email: 'demo@user.io', 
    password: 'password'
  )

  # More users
  10.times do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    }) 
  end

  puts "Creating cameras..."

  TYPES = ['slr', 'dslr', 'point_and_shoot', 'range_finder', 'video']
  FORMATS = ['large', 'medium', '35mm', '110', 'digital_crop', 'digital_full_frame']

  100.times do
    Camera.create!({
        brand: Faker::Camera.brand,
        model: Faker::Camera.model,
        year: [*1839..2023].sample,
        sku: Faker::Barcode.ean(8),
        price: rand(5000).to_f,
        sold: false,
        camera_type: TYPES.sample,
        format: FORMATS.sample,
        version: rand(5)
    })
  end

  puts "Done!"
end