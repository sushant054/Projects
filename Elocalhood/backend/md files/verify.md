# Verification Process
```
POST /v1/register
```
### Request Headers
```
Content-Type : application/json
```

### Request Body
```json
{
    "AadharImageFront": "Base64Encoded",
    "AadharImageBack": "Base64Encoded",
    "UserPhoto": "Base64Encoded",
    "AccountNumber": "numeric",
    "UpiId": "string",
    "QRCode": "Base64Encoded"
}

```
## Response
200 - Success

Return Popup Message: Verification Successful?
400 - Bad Request

Invalid Document Details
**500 - Internal Server Error
