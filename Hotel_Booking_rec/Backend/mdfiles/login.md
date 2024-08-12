## Login API
```
POST /v1/login
```

## Request Headers
```
Content-Type : application/json
```
 
## Request Body
``` json 
{
    "username": "String",
    "Password": "String"
}
```
## Response
#### 200 - Success
```
Body
{
    "user_id": Number,
    "email": "user@example.com"
}
```
#### 400 - Bad Request - Incorrect Email/Password
#### 404 - Not Found- User does not exist
#### 500 - Internal Server Error

## Verify username API
```
POST /v1/verify-username
```

## Request Headers
```
Content-Type : application/json
```
 
## Request Body
``` json 
{
    "username": "String"
}

```
## Response
#### 200 - Success
#### 400 - Bad Request - Incorrect Email/Password
#### 404 - Not Found- User does not exist
#### 500 - Internal Server Error
## Update password API
```
POST /v1/verify-username
```

## Request Headers
```
Content-Type : application/json
```
  
## Request Body
``` json 
{
    "username": "String"
}

```
## Response
#### 200 - Success
 
#### 400 - Bad Request - Incorrect Email/Password
#### 404 - Not Found- User does not exist
#### 500 - Internal Server Error