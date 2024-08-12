# Booking API

## 1. Get User ID

### Endpoint
`GET /api/user-id`

### Request Headers

```
Content-Type : application/json
```

### Response

#### 200 - Success
```json
{
    "user_id": Number
}

```
#### 401  Unauthorized- User not logged in or invalid token
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
POST /v1/update-status
```

## Request Headers
```
Authorization: Bearer <JWT Token>
Content-Type: application/json

```

### Request Body
```
{
    "booking_id": Number,
    "status": "String" // Should be either "draft" or "complete"
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