# User Review API
'''
POST  /v1/review
'''
### Request Headers
'''
Content-type : application/json
'''

### Request Body
''' json
{
    "serviceProviderId": "123",
    "rating": 4.5,
    "comment": "Excellent service!"
}
'''
## Response

201- Created

Body
{
  "message": "Review submitted successfully"
}

400 - Bad Request 
403 - Forbidden
404 - Not Found
500 - Internal Server Error