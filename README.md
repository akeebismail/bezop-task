# Kibb Bezob cloud task 

## deploying angular seems a bit tough
the app can be run like this
clone the project in a directory (bezop)
navigate to the directory `cd bezop`
the app folder is the back-end app
run the following commands
## `cd app`
## `composer install`
## `cp .env-example .env`
## create database  and fill the .env 
DB_DATABASE=db name
DB_USERNAME=root
DB_PASSWORD=db password

`php artisan migrate`
`php artisan serve`
## navigate to the front-end folder
## run the following commands
## `npm install `
## `ng serve`

notes: angular cli must be install global on your system

