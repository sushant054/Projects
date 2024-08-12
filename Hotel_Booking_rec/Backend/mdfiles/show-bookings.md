##  API Documentation
### Fetch All Bookings API
```
GET /api/user-id
```

### Request Headers
```
Content-Type : application/json
```
## Authorization : Bearer <JWT Token>
### Response
#### 200 - Success
```json
{
    "user_id": Number
}
```

#### 401 - Unauthorize- User not logged in or invalid token  
################################
### Fetch All Bookings for a specific User
```
GET /api/bookings
```

### Request Headers
```
Content-Type : application/json
```
##  Query Parameters
#### `user_id` (required): The ID of the user whose bookings are to be fetched.
### Response
#### 200 - Success
```json
[
    {
        "booking_id": "String",
        "hotel_name": "String",
        "check_in_date": "YYYY-MM-DD",
        "check_out_date": "YYYY-MM-DD",
        "number_of_guests": Number,
        "room_type": "String",
        "payment": "String",
        "status": "String"
    },
    ...
]

```
 #### 500- Internal server Error
```
{
    "error": "Server error"
}
```
##############################
## Add a New Booking
```
POST/ api/bookings
```
### Request Headers
```
Authorization: Bearer <JWT Token>
Content-Type: application/json

```
### Request Body
```json
{
    "hotel_name": "String",
    "check_in_date": "YYYY-MM-DD",
    "check_out_date": "YYYY-MM-DD",
    "number_of_guests": Number,
    "room_type": "String",
    "payment": "String", // Optional
    "status": "draft" // Optional (default is "draft")
}

```
 
### Response
#### 200 - Success
#### 404- Not found
#### 500- Internal Server Error
```
{
    "error": "Booking not found"
}
```
#### 500- Internal server Error
```
{
    "error": "Server error"
}
```
########################
## Update Booking Status
```
POST/ api/bookings
```
### Request Headers
```
Authorization: Bearer <JWT Token>
Content-Type: application/json

```
### Request Body
```json
{
    "booking_id": Number,
    "status": "String" // Should be either "draft" or "complete"
}
```
 
### Response
#### 200 - Success
```
{
    "message": "Booking status updated successfully"
}

```
#### 404- Not found
#### 500- Internal Server Error
```
{
    "error": "Booking not found"
}
```
#### 500- Internal server Error
```
{
    "error": "Server error"
}
```









## Delete Booking API
```
DELETE/ api/bookings/:id
```
### Request Headers
```
Content-Type : application/json
```
## path parameters 
id-the id of the booking to be deleted
### Response
#### 200 - Success
#### 404- Not found
```
{
    "error": "Booking not found"
}
```
#### 500- Internal server Error
```
{
    "error": "Server error"
}
```