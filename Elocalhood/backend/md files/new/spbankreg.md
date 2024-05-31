# Service Provider Registration API(bank account details)
```
POST /v1/sqbankreg
```

## Request Headers
```
Content-Type : application/json
```

## Request Body
``` json 
 "BankAccountDetails":
  {
        "Name": "string",
        "AccNumber": "numeric",
        "Re-enterAccNumber": "numeric",
        "IFSCCode": "string"
    }
```
## Response
```
200 - Success
Body
{
    "provider_id": Number,
 
}

400 - Bad Request - Invalid Registration Information
403 - Forbidden
404 - Not Found
500 - Internal Server Error


   