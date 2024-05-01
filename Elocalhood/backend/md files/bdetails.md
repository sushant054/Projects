# Business Details API
```
POST /v1/business-details
```
### Request Headers
```
Content-Type: application/json
```
 ## Request Body (For Service Provider)
```json
{
    "UserType": "string",
    "ServiceDetails": {
        "ServiceProvided": "string",
        "ShopName": "string",
        "FullName": "string",
        "ServiceProviderImage": "string",
        "PhoneNumber": "numeric",
        "ShopLocationAddress": "string",
        "SaveInDatabase": "boolean"
    }
}

```
## Response
```
200 - Success

400 - Bad Request

Invalid Business Details
500 - Internal Server Error
```







i need to create service provider registration page 
it include store name ,pincode,city,state,address create api file like below....