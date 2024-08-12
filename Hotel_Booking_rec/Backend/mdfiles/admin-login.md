# Admin Login API

## Overview
This API allows an admin to log in with a hardcoded username and password. Upon successful login, the admin receives a JWT token that is required for accessing other admin-related APIs.

## Endpoint
**URL:** `/v1/admin-login`  
**Method:** `POST`

## Request Headers
- **Content-Type:** `application/json`

## Request Body
```json
{
  "username": "admin_username",
  "password": "admin_password"
}
```
## Response
#### 200 - Success
```json
{
  "message": "Login successful",
  "token": "your_jwt_token"
}
```

#### 404 - Not Found- User does not exist

```json
{
  "message": "Invalid username or password"
}
```
##############################################3333
# API Documentation

## Overview

This document provides an overview of the APIs available for viewing users' information and hotel details information. All the APIs require JWT authentication.

## Authentication

All the APIs are protected using JWT authentication. You need to include a valid JWT token in the `Authorization` header of your requests.

### Authorization Header

```plaintext
Authorization: Bearer <your_jwt_token>
```
## Api Endpoints
## Endpoint
**URL:** `/v1/users`  
**Method:** `GET`

## Request Headers
```
Authorization: Bearer <your_jwt_token>
```
#### 200 - Success
## Resposns Body
``` json 
[
    {
        "user_id": 1,
        "name": "John Doe",
        "username": "johndoe",
        "password": "hashed_password",
        "phone_number": "1234567890",
        "email": "john@example.com"
    },
    ...
]

```
#### 401 - unauthorized
#### 500 - Internal Server Error

##############################################
## Get Hotel Details Information
## Api Endpoint
## Endpoint
**URL:** `/v1/hotel-details`  
**Method:** `GET`

## Request Headers
```
GET /v1/hotel-details
Authorization: Bearer <your_jwt_token>

```
#### 200 - Success
## Resposns Body
``` json 
[
    {
        "booking_id": 1,
        "user_id": 1,
        "hotel_name": "Hotel XYZ",
        "check_in_date": "2024-08-01",
        "check_out_date": "2024-08-05",
        "number_of_guests": 2,
        "room_type": "Deluxe",
        "payment": "Paid",
        "status": "complete"
    },
    ...
]

```
#### 500 - Internal Server Error
#### 401 - unauthorized
