# Meeting Room Booking API

A simple REST API that allows members to book meeting rooms.  
The system prevents booking conflicts and supports webhook notifications when bookings are created or cancelled.

---

## Features

- Create meeting room booking
- List all bookings
- Cancel booking
- Prevent overlapping bookings for the same room
- Webhook notification when booking is created or cancelled
- Basic unit test for booking conflict logic

---

## Tech Stack

- Node.js
- Express
- Axios
- Jest (for unit testing)

---

## Setup Instructions

1. Clone the repository

git clone <your-repo-url>

2. Install dependencies

npm install

3. Start the server

node server.js

Server will run on:

http://localhost:3000

---

## API Endpoints

### 1. Create Booking

POST /bookings

Request Body Example

{
  "room": "Room A",
  "member": "Farzana",
  "start": "2026-03-10T10:00:00",
  "end": "2026-03-10T11:00:00"
}

If the room is already booked during the same time slot, the API will return an error.

---

### 2. List All Bookings

GET /bookings

Returns a list of all bookings stored in memory.

---

### 3. Cancel Booking

DELETE /bookings/:id

Example:

DELETE /bookings/1

---

### 4. Register Webhook

POST /webhooks

Allows external systems to receive notifications when a booking is created or cancelled.

Request Body Example

{
  "url": "https://example.com/webhook"
}

Webhook requests will retry up to **3 times** if the request fails.

---

## Running Tests

Run unit tests using:

npx jest

The test verifies that the booking conflict detection logic works correctly.

---

## Notes

- Bookings are stored in **memory** (no database) as required in the assessment.
- The API checks for **time slot overlap** before allowing a new booking.