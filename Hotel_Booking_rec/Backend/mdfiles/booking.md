# Booking API
## Fetch all bookings api
```
GET /v1/bookings
```

## Request Headers
```
Content-Type : application/json
```

### Response

#### 200 - Success
```json
[
    {
        "booking_id": "String",
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
########################################
# Add a New Booking API
```
POST /v1/bookings
```

## Request Headers
```
Content-Type : application/json
```

### Request Body
```
{
    "hotel_name": "String",
    "check_in": "String",
    "check_out": "String",
    "guest": "Number",
    "room_type": "String",
    "payment": "String",   // Optional
    "status": "String"    // Optional, defaults to 'draft'
}
```
## Response
#### 201- Created
```
{
    "message": "Booking added successfully"
}

```
#### 400 - Bad Request - validation error
#### 500 - Internal Server Error

########################################
# Update Booking Status API
```
POST /v1/bookings
```

## Request Headers
```
Content-Type : application/json
```

### Request Body
```
{
    "hotel_name": "String",
    "check_in": "String",
    "check_out": "String",
    "guest": "Number",
    "room_type": "String",
    "payment": "String",   // Optional
    "status": "String"    // Required
}

```
## Response
#### 201- Created
```
{
    "message": "Booking added successfully with status"
}


```
#### 400 - Bad Request - validation error
```
{
    "error": "Missing required fields"
}

```

#### 500 - Internal Server Error
```
{
    "error": "Failed to add booking"
}
```