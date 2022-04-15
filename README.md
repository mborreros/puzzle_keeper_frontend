# Puzzle Keeper

This is a web app that allows puzzle hobbyists to keep track of their puzzling household memebers, their collective wishlist and collection, and reviews on their owned puzzles. 

## Description

This web app is made by a hobbyist for fellow hobbyists. The main intention was to make the review writing and formating process experience easier for puzzlers. As a result, it allows the users to copy their individual reviews to their clipboard in markdown format to easily paste onto Reddit to post. 

## Getting Started

### Dependencies

This app requires the download of the companion [backend database](https://github.com/mborreros/puzzle_keeper_backend). Clone this and the backend repository to use complete functionality. 
All other frontend libraries and packages are available within this frontend repository (install described below).
App is best view in Google Chrome browser. 

### Installing and Executing

Upon cloning this repository, open the file within your computer's terminal. Once you have navigated to the respective folder/file, run `npm install` to download all necessart packages and dependencies. 
Note, this project utlizes React, React DOM Router, Bootstrap 5, Material Design Bootstrap, Moment date/time formatter, and an assortment of FontAwesom icons. There should all be availble upon install. 

For the [backend database](https://github.com/mborreros/puzzle_keeper_backend), there is minimal install necessary. 
Once you clone the repository, run `bundle install` in the terminal to download the Ruby gems. This project utilizes SQLite, Active Record, Faker, and other gems. 
There are some rake commands coded into this project for ease of set up. Run `bundle exec rake db:seed` to load some base data into the web app. Run `bundle exec rake db:seed:replant` to delete the previous seed data and overwrite it. 
Run `rake server` to get the server up and running and communicating with the front end. 

## Need Help?

Contact the project creator if you need any support!

### Author/Creator

Maya Borrero 
Email: mayaborrero@outlook.com


## Version Histroy

V2 | Main branch, complete/compiled web app
V1 | Dev branch used for building web app
