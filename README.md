# Hotel-Booking-Service
This repository contains the code for a simple hotel booking service built with Node.js, Express, and MongoDB. The service allows users to sign up, log in, and book rooms in various hotels. Administrators can create, update, and delete hotels and rooms.

##Features
1. User authentication (sign up, log in)
2. JWT-based authentication and authorization
3. CRUD operations for hotels and rooms
4. Booking functionality for users
5. Protected routes for admin operations

##Prerequisites
1.Node.js
2.MongoDB
3.Postman (for testing the API)

##Installation
*Clone the repository:
{
  git clone https://github.com/MohitRanjan2433/Hotel-Booking-Service.git
  cd hotel-booking-service
}

##Install the dependencies:
{
  npm install
}

##Create a .env file in the root directory and add the following environment variables:
{
  1.PORT=5000
  2.MONGO_URI=your_mongodb_connection_string
  3.JWT_SECRET=your_jwt_secret
  4.ADMIN_EMAIL=admin@example.com
}

##Start the server:
node server.js

#API Endpoints
{
  [
    POST /api/users/signup,
    POST /api/users/login,
  ],
  [
    POST /api/hotels/createHotel,
    GET /api/hotels/hotels,
    GET /api/hotels/hotel/:id,
    GET /api/hotels/hotel?name=Hotel California,
    PUT /api/hotels/hotel/:id,
    DELETE /api/hotels/hotel/:id,
  ],
}
