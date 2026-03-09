const { sendWebhook } = require('./webhookService');

let bookings = [];
let idCounter = 1;

/**
 * Check if time slots overlap
 */
function isConflict(room, start, end, existingBookings = bookings) {
  return existingBookings.some(b => {
    return (
        b.room === room &&
        new Date(start) < new Date(b.end) &&
        new Date(end) > new Date(b.start)
    );
    });
}

/**
 * Create a new booking
 */
async function createBooking( data = {}) {
    const { room, member, start, end } = data;

    if (!room || !member || !start || !end) {
        throw new Error("Missing booking fields");
    }

    if (isConflict(room, start, end)) {
        throw new Error("Room already booked for the selected time");
    }

    const booking = {
        id: idCounter++,
        room,
        member,
        start,
        end
    };

    bookings.push(booking);

    await sendWebhook("booking_created", booking);

    return booking;
}

/**
 * Get all bookings
 */
function getBookings() {
    return bookings;
}

/**
 * Delete booking
 */
async function deleteBooking(id) {
    const bookingId = Number(id);
    const index = bookings.findIndex(b => b.id === bookingId);

    if (index === -1) {
        throw new Error("Booking not found");
    }

    const booking = bookings.splice(index, 1)[0];

    await sendWebhook("booking_cancelled", booking);

    return { message: "Booking cancelled successfully" };
}

module.exports = {
    createBooking,
    getBookings,
    deleteBooking,
    isConflict
};
