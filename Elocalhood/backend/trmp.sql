--tables in e_Localhood1 database
-- Table for users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    phone_number VARCHAR(20),
    password VARCHAR(255),
    email VARCHAR(255) UNIQUE
     --ALTER TABLE users ADD COLUMN image BLOB;
);

-- Table for service providers
CREATE TABLE service_providers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_name VARCHAR(255),
    pincode VARCHAR(10),
    city VARCHAR(100),
    state VARCHAR(100)
);

-- Table for service providers with bank details
CREATE TABLE service_providers_bank (
    id INT AUTO_INCREMENT PRIMARY KEY,
    acc_holder_name VARCHAR(255),
    bank_acc_number VARCHAR(50),
    ifsc_code VARCHAR(20)
);

-- input (json): 
login.js
{
    "Email": "sushhh@gmail.com",
    "Password": "psw123"
}

signup.js
{
    "Name": "John Doe",
    "PhoneNumber": 1234567890,
    "Password": "P@ssw0rd",
    "Email": "john.doe@example.com",
   -- "Image": "data:image/png;...",
    
}

spbankereg.js
{
    "BankAccDetails": {
        "Name": "vid",
        "AccNumber": "1234507870123456",
        "Re-enterAccNumber": "1234507870123456",
        "IFSCCode": "ABCD0123486"
    }
}

  


    -- what i want to do fetch service provider column and collect common service provider names and shows the list of 
    -- common service providers write program  for backend in nodejs


spregistraion.js
{
    "YourStoreName": "Example Store",
    "Pincode": "123456",
    "City": "Example City",
    "State": "Example State",
    "Address": "123 Example St",
    "ServiceName": "Example Service"
}


http://localhost:3000/v1/commonspnames
http://localhost:3000/v1/serviceproviders/Doctor
report signup  
http://localhost:3000/v1/signup-report

reprot spregistration
http://localhost:3000/v1/spreport


review page json input:

http://localhost:3000/v1/review

{
  "id": "002",
  "rating": "5",
  "comment": "Great service, highly recommended!"
}

dashboard 
http://localhost:3000/v1/serviceproviders 