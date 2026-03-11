# Edirne Kırmızısı API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 📦 Products API

### Get All Products
```http
GET /products
```
**Response:**
```json
[
  {
    "id": 1,
    "title": "Product Name",
    "category": "Kilim",
    "description": "Product description",
    "price": "500",
    "imageUrl": "http://...",
    "inStock": true,
    "stockCount": 10,
    "images": ["url1", "url2"],
    "createdAt": "2026-01-15T10:30:00"
  }
]
```

### Get Product by ID
```http
GET /products/{id}
```

### Search & Filter Products
```http
GET /products/search?query=kilim&category=Kilim&minPrice=100&maxPrice=1000&inStock=true&page=0&size=20
```

### Get Products by Category
```http
GET /products/category/{category}
```

### Get All Categories
```http
GET /products/categories
```

### Create Product (Admin)
```http
POST /products
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "Product Name",
  "category": "Kilim",
  "description": "Description",
  "price": "500",
  "stockCount": 10,
  "images": ["url1", "url2"]
}
```

### Update Product (Admin)
```http
PUT /products/{id}
Authorization: Bearer <admin-token>
```

### Update Stock
```http
PATCH /products/{id}/stock?stockCount=50
```

### Delete Product (Admin)
```http
DELETE /products/{id}
Authorization: Bearer <admin-token>
```

---

## 🛒 Orders API

### Create Order
```http
POST /orders
Content-Type: application/json

{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+905551234567",
  "shippingAddress": "123 Main St",
  "city": "Edirne",
  "postalCode": "22100",
  "userId": 1,  // Optional - for logged in users
  "items": [
    {
      "productId": 1,
      "quantity": 2
    }
  ],
  "couponCode": "WELCOME10"  // Optional
}
```

**Response:**
```json
{
  "success": true,
  "orderId": 123,
  "message": "Order created successfully"
}
```

### Get All Orders (Admin)
```http
GET /orders
Authorization: Bearer <admin-token>
```

### Get Order by ID
```http
GET /orders/{id}
```

### Get User Orders
```http
GET /orders/user/{userId}
Authorization: Bearer <user-token>
```

### Update Order Status (Admin)
```http
PATCH /orders/{id}/status
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "SHIPPED"
}
```
**Status Options:** `PENDING`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`

### Cancel Order
```http
PATCH /orders/{id}/cancel
```

### Get Order Statistics (Admin)
```http
GET /orders/stats
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "totalOrders": 150,
  "statusCounts": {
    "pending": 5,
    "processing": 10,
    "shipped": 20,
    "delivered": 110,
    "cancelled": 5
  },
  "totalRevenue": 75000.0,
  "averageOrderValue": 500.0
}
```

---

## 👤 Authentication & Users API

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "username": "johndoe",
  "role": "USER",
  "email": "john@example.com"
}
```

### Forgot Password
```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

### Reset Password
```http
POST /auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-from-email",
  "newPassword": "NewSecurePass123"
}
```

### Verify Reset Token
```http
GET /auth/verify-reset-token?token=reset-token
```

---

## ⭐ Reviews API

### Get Product Reviews
```http
GET /reviews/product/{productId}
```

**Response:**
```json
[
  {
    "id": 1,
    "rating": 5,
    "comment": "Great product!",
    "user": {
      "id": 1,
      "username": "johndoe"
    },
    "approved": true,
    "verified": true,
    "helpfulCount": 5,
    "createdAt": "2026-01-15T10:30:00",
    "adminResponse": "Thank you for your review!"
  }
]
```

### Create Review
```http
POST /reviews
Authorization: Bearer <user-token>
Content-Type: application/json

{
  "productId": 1,
  "userId": 1,
  "rating": 5,
  "comment": "Excellent quality!"
}
```

### Get Review Statistics
```http
GET /reviews/product/{productId}/stats
```

**Response:**
```json
{
  "averageRating": 4.5,
  "reviewCount": 23
}
```

### Approve Review (Admin)
```http
PATCH /reviews/{reviewId}/approve
Authorization: Bearer <admin-token>
```

### Add Admin Response
```http
PATCH /reviews/{reviewId}/response
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "response": "Thank you for your feedback!"
}
```

### Mark Review as Helpful
```http
PATCH /reviews/{reviewId}/helpful
```

### Get Pending Reviews (Admin)
```http
GET /reviews/pending
Authorization: Bearer <admin-token>
```

### Delete Review
```http
DELETE /reviews/{reviewId}
Authorization: Bearer <admin-token>
```

---

## 🎟️ Coupons API

### Validate Coupon
```http
POST /coupons/validate
Content-Type: application/json

{
  "code": "WELCOME10",
  "orderAmount": 500.0
}
```

**Response:**
```json
{
  "valid": true,
  "discount": 50.0,
  "finalAmount": 450.0
}
```

### Get Active Coupons
```http
GET /coupons/active
```

### Get All Coupons (Admin)
```http
GET /coupons
Authorization: Bearer <admin-token>
```

### Create Coupon (Admin)
```http
POST /coupons
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "code": "SUMMER20",
  "description": "20% summer discount",
  "discountType": "PERCENTAGE",
  "discountValue": 20.0,
  "minimumOrderAmount": 200.0,
  "maximumDiscountAmount": 100.0,
  "usageLimit": 100,
  "perUserLimit": 1,
  "expiresAt": "2026-08-31T23:59:59",
  "active": true
}
```

**Discount Types:** `PERCENTAGE`, `FIXED_AMOUNT`

### Update Coupon (Admin)
```http
PUT /coupons/{id}
Authorization: Bearer <admin-token>
```

### Delete Coupon (Admin)
```http
DELETE /coupons/{id}
Authorization: Bearer <admin-token>
```

---

## 📧 Newsletter API

### Subscribe
```http
POST /newsletter/subscribe
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe"
}
```

### Unsubscribe
```http
POST /newsletter/unsubscribe
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### Get All Subscribers (Admin)
```http
GET /newsletter/subscribers
Authorization: Bearer <admin-token>
```

---

## 📍 Addresses API

### Get User Addresses
```http
GET /addresses/user/{userId}
Authorization: Bearer <user-token>
```

### Get Default Address
```http
GET /addresses/user/{userId}/default
Authorization: Bearer <user-token>
```

### Create Address
```http
POST /addresses
Authorization: Bearer <user-token>
Content-Type: application/json

{
  "userId": 1,
  "title": "Home",
  "fullName": "John Doe",
  "phone": "+905551234567",
  "addressLine": "123 Main Street, Apt 4B",
  "city": "Edirne",
  "district": "Merkez",
  "postalCode": "22100",
  "isDefault": true
}
```

### Update Address
```http
PUT /addresses/{id}
Authorization: Bearer <user-token>
```

### Delete Address
```http
DELETE /addresses/{id}
Authorization: Bearer <user-token>
```

### Set Default Address
```http
PATCH /addresses/{id}/set-default
Authorization: Bearer <user-token>
```

---

## 📝 Contact API

### Send Contact Message
```http
POST /contact/send
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question about products",
  "message": "I would like to know more about..."
}
```

---

## 📁 File Upload API

### Upload Image
```http
POST /upload/image
Content-Type: multipart/form-data

file: <image-file>
```

**Response:**
```json
{
  "url": "http://localhost:8080/uploads/abc-123-def.jpg",
  "filename": "abc-123-def.jpg"
}
```

### Upload Multiple Images
```http
POST /upload/images
Content-Type: multipart/form-data

files: <multiple-image-files>
```

**Response:**
```json
{
  "urls": [
    "http://localhost:8080/uploads/file1.jpg",
    "http://localhost:8080/uploads/file2.jpg"
  ]
}
```

---

## 📊 Analytics API (Admin)

### Get Sales Trends
```http
GET /analytics/sales-trends?period=MONTH
Authorization: Bearer <admin-token>
```

**Period Options:** `WEEK`, `MONTH`, `YEAR`

### Get Top Products
```http
GET /analytics/top-products?limit=10
Authorization: Bearer <admin-token>
```

### Get Customer Analytics
```http
GET /analytics/customers
Authorization: Bearer <admin-token>
```

---

## 🎯 Product Recommendations API

### Get Related Products
```http
GET /recommendations/related/{productId}?limit=4
```

### Get Products by Category
```http
GET /recommendations/by-category/{category}?limit=8
```

### Get Trending Products
```http
GET /recommendations/trending?limit=6
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message description",
  "timestamp": "2026-01-15T10:30:00",
  "status": 400
}
```

### Common Status Codes
- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Rate Limiting
- **Public endpoints:** 100 requests per minute
- **Authenticated endpoints:** 1000 requests per minute
- **Admin endpoints:** No limit

---

## Pagination

List endpoints support pagination:
```http
GET /products?page=0&size=20&sort=createdAt,desc
```

**Parameters:**
- `page` - Page number (0-indexed)
- `size` - Items per page (default: 20, max: 100)
- `sort` - Sort field and direction

**Response includes:**
```json
{
  "content": [...],
  "totalElements": 150,
  "totalPages": 8,
  "size": 20,
  "number": 0
}
```

---

## Webhooks (Coming Soon)

Register webhooks for events:
- Order created
- Order status changed
- Low stock alert
- New review submitted

---

For questions or support, contact: support@edirnekirmizisi.com
