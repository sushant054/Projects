# Hotel Booking System
## Table of Contents
1. Database Tables
2. List of APIs
3. API Documentation
4. List of Pages
5. Strength in Node.js
6. Download and Run the Project

## Database Tables
### users
 This table contains `user_id`, `name`, `username`,`password`,`phone_number`,`email` etc.
 ### Bookings
 This tables contains `booking_id`,`hotel_name`,`check_in`,`check_out`,`guest`,`room_type`,`payment`,`status` etc.
## List of APIs
### User Authentication:

`POST /v1/login` - Login API
`POST /v1/signup`- Signup API
### Hotel Bookings:

`GET /v1/hotel-bookings` - Retrieve hotel bookings

`POST /api/bookings` - Add a new booking

`POST /api/update-status` - Update the status of a booking

`GET /api/bookings` - Fetch all bookings

`DELETE /api/bookings/:id` - Delete a specific booking

## API Documentation
 here i have created these APIs
1. Login API
2. Signup API
3. Hotel Bookings API
4. Bookings API
5. Show and Delete Bookings API

## List of pages

1. Login Page: Allows users to log in to their accounts.
2. Forgot Password: If user forget password user can simply change the password by clicking on forgot password.
3. Signup Page: New users can register.
4. Dashboard: Displays an overview of hotel bookings, also you can book hotel by searching near by area or any particular location here list of recommended hotels displays you can select one of them and book 

5. Booking Page: Allows users to select and book hotel.
6. Show Booked Hotels Page: This page allows users to see booked hotel information also user able to delete this page. 

## Strength in Node.js
I have good enough knowledge of Node.js, which I demonstrated in my academic project where I designed MD files and APIs. My experience includes building RESTful APIs, handling database interactions using MySQL, and working with Node.js frameworks like Express.js.

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
