# Admin Dashboard API

POST  /v1/Dashboard

###  Request Headers

Content-Type: application/json

## ServiceProviders

### Request Body
json
{
    "Order ID":"string",
    "Service":"string",
    "Customer":"string",
    "Date":"",
    "OrderStatus":"string"
}

201 - Created

Body
{
    "Message":"ServiceProviders listed successfully"
}

400 - Bad Request 
403 - Forbidden
404 - Not Found
500 - Internal Server Error