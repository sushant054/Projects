# Hotel Booking System
## Table of Contents
1. List of APIs
2. API Documentation
3. Database Tables
4. List of Pages
5. Strength in Node.js
6. Download and Run the Project

## List of APIs
## API Documentation

1. Login API
2. Signup API
3. Hotel Bookings API
4. Bookings API
5. Show and Delete Bookings API

## List of pages
#### I have created these pages using tech.(HTML, CSS, JavaScrip, Nodejs, MYSQL)
1. Login Page: Allows users to log in to their accounts.
2. Forgot Password: If user forget password user can simply change the password by clicking on forgot password.
3. Signup Page: New users can register.
4. Dashboard: Displays an overview of hotel bookings, also you can book hotel by searching near by area or any particular location here list of recommended hotels displays you can select one of them and book 

5. Booking Page: Allows users to select and book hotel.
6. Show Booked Hotels Page: This page allows users to see booked hotel information also user able to delete this page and user can see only their own data.

## Database Tables
### users
 This table contains `user_id`, `name`, `username`,`password`,`phone_number`,`email` etc.
 ### Bookings
 This tables contains `booking_id`,`hotel_name`,`check_in`,`check_out`,`guest`,`room_type`,`payment`,`status` etc.
 
### User Authentication:
`POST /v1/login` - Login API
`POST /v1/signup`- Signup API
### Hotel Bookings:

`GET /v1/hotel-bookings` - Retrieve hotel bookings

`POST /api/bookings` - Add a new booking

`POST /api/update-status` - Update the status of a booking

`GET /api/bookings` - Fetch all bookings

`DELETE /api/bookings/:id` - Delete a specific booking

## Strength in Node.js
I have good enough knowledge of Node.js, which I demonstrated in my academic project where I designed MD files and APIs. My experience includes building RESTful APIs, handling database interactions using MySQL, and working with Node.js frameworks like Express.js. also i have done validation, authentication of apis using tokens.  

## Download and Run the Project 
### Prerequisites
1. Node.js
2. MySQL
#### Steps to download
1. Clone the Repository
2. Install Dependencies
3. Set Up the Database - To set up database refer file ./Backend/databasesecmd.sql   
4. Run & Access the Application -
Open your browser & navigate to http://localhost:3000
### Video of Application..
#### https://drive.google.com/file/d/1wZ4YM94o20kwyT8rvt47tbk-eOQ4WEP4/view?usp=sharing

## Visit My Other Projects 
1. https://github.com/sushant054/Projects/tree/main/Elocalhood/backend

2. https://github.com/sushant054/Projects/tree/main/Online%20Voting%20system

