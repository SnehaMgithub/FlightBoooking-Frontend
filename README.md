# Flight Booking and Reservation System

A comprehensive **Flight Booking and Reservation System** built using the **MERN stack** with features for searching flights, booking management, secure payments, real-time updates, and user account management. This project implements modern web technologies for enhanced user experience and functionality.

---

## **Tech Stack**
- **Frontend:** React.js, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

---

## **API Endpoints**

### **1. Flights**
- `GET /api/flights`: Retrieve all flights.
- `POST /api/flights/search`: Search flights based on criteria.
- `POST /api/flights/book`: Book a selected flight.

### **2. Bookings**
- `GET /api/bookings/:userId`: Retrieve all bookings for a user.
- `PATCH /api/bookings/:bookingId`: Update booking details.
- `DELETE /api/bookings/:bookingId`: Cancel a booking.

### **3. Payments**
- `POST /api/payments`: Process payment using Stripe or PayPal.

### **4. Users**
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in a user.
- `GET /api/users/profile`: Retrieve user profile details.

---


### **Postman Collection Details**

https://documenter.getpostman.com/view/39168825/2sAYBUCrnt


### **Documentation for Backend Details**

https://docs.google.com/document/d/1jmwngc8fjbDI8YMpBIdfzmMbBxdldG1JsZ0kZRLK-8I/edit?usp=sharing