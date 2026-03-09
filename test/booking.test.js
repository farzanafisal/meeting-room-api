const { isConflict } = require("../bookingService");

test("Detects booking conflict", () => {

    const bookings = [
        { room: "A",
            start: "2026-03-10T10:00:00",
            end: "2026-03-10T11:00:00" 
        }
    ];

    const conflict = isConflict(
        "A",
        "2026-03-10T10:30:00",
        "2026-03-10T11:30:00",
        bookings
    );

    expect(conflict).toBe(true);
});