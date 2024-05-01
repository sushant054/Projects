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
    "YourStoreName": "string",
    "Pincode": "numeric",
    "City": "string",
    "State": "string",
    "Address":
    /* {
        "Area": "string",
        "Street": "string",
        "ShopNo": "string" // optional
    }
*/
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

 