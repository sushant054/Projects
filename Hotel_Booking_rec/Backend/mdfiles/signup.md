## Signup API
```
POST /v1/signup
```

## Request Headers
```
Content-Type : application/json
```
 
## Request Body
``` json 
{
    "Name": "String",          // Alphabetic characters only, 3-30 characters long
    "UserName": "String",      // Alphanumeric, 3-30 characters long
    "Password": "String",      // Minimum 4 characters, must include at least one special character
    "PhoneNumber": "String",   // 10 digits, cannot start with '123'
    "Email": "String"          // Valid email format, will be stored in lowercase
}
```
## Response
#### 201 - Success
```
Body
{
    "user_id": Number,
    "username": "String"
}
```
#### 400 - Bad Request - validation error
#### 409 - Conflict
#### 403 - Forbidden
#### 500 - Internal Server Error
