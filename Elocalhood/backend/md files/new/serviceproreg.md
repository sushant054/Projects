# Service Provider Registration API
```
POST /v1/serviceproreg
```

## Request Headers
```
Content-Type : application/json
```

## Request Body
``` json 
 {
    "YourStoreName": "Example Store",
    "Pincode": "123456",
    "City": "Example City",
    "State": "Example State",
    "Address": "123 Example St",
    "ServiceName": "Example Service"
}

```
## Response
```
200 - Success
Body
{
    "provider_id": Number,
    "store_name": "string"
}

400 - Bad Request - Invalid Registration Information
403 - Forbidden
404 - Not Found
500 - Internal Server Error

 