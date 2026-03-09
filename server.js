const express = require("express");
const { createBooking, getBookings, deleteBooking } = require("./bookingService");
const { registerWebhook } = require("./webhookService");

const app = express();
app.use(express.json());

/**
 * Create booking
 */
app.post("/bookings", async (req, res) => {
  try {
    const booking = await createBooking(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * List bookings
 */
app.get("/bookings", async (req, res) => {
    res.json(getBookings());
});

/**
 * Delete booking
 */
app.delete("/bookings/:id", async (req, res) => {
  try {
    const result = await deleteBooking(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * Create webhook
 */
app.post("/webhooks", (req, res) => {
    const { url } = req.body;
    registerWebhook(url);
    res.json({ message: "Webhook registered successfully" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});