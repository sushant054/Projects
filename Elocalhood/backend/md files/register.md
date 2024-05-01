# User Registration API
```
POST /v1/register
```

### Request Headers
```
Content-Type : application/json
```

### Request Body
``` json
{
    "Name": "string",
    "PhoneNumber": "numeric",
    "Password": "string",
    // "VerificationType": "string",
    "Email": "string",
    "Image":"string",
    "ServiceName":"string"
    // "OTP": "string"    
}
```
## Response
```
201-Created

Body
{
    "user_id": Number,
    "email": "string"
}
```
400 - Bad Request - Invalid Registration Information

409 - Conflict

500 - Internal Server Error