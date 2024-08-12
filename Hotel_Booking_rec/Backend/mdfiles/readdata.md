## Hotel Booking API
```
GET /v1/hotel-bookings
```

## Request Headers
```
Content-Type : application/json
```

### Query Parameters
- `search` (optional): A string to filter hotel bookings by any field that contains the search term.

### Response

#### 200 - Success
```json
[
    {
        "booking_id": "String",
        "user_name": "String",
        "hotel_name": "String",
        "booking_date": "String",
        "check_in_date": "String",
        "check_out_date": "String",
        "total_amount": "String",
        ...
    },
    ...
]

```
#### 500 - Internal Server Error
