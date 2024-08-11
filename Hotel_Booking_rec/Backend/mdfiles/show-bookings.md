##  API Documentation
### Fetch All Bookings API
```
GET /v1/bookings
```

### Request Headers
```
Content-Type : application/json
```
  
### Response
#### 200 - Success
```json
[
    {
        "booking_id": "String",
        "user_id": "String",
        "hotel_name": "String",
        "check_in": "String",
        "check_out": "String",
        "guest": "Number",
        "room_type": "String",
        "payment": "String",
        "status": "String"
    },
    ...
]
```

#### 500 - Internal Server Error

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