--for registration page
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE
);
-- 
 
--Bookings
 
---------
CREATE TABLE Bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_name VARCHAR(100) NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guest INT NOT NULL,
    room_type VARCHAR(50) NOT NULL,
    payment DECIMAL(10, 2),
    status ENUM('draft', 'complete') NOT NULL
);
--
 
CREATE TABLE hotelBooking (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    hotel_name VARCHAR(800) NOT NULL,   
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    number_of_guests INT NOT NULL,
    room_type VARCHAR(50) NOT NULL,
    payment DECIMAL(10, 2),
    status ENUM('draft', 'complete') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

