const route2 = require('express').Router();
const Booking = require('../models/Booking');
const { verifyToken } = require('../middleware');

// GET all bookings (admin or for debug) - consider restricting in production
route2.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

// create a booking - require authentication
route2.post('/book', verifyToken, async (req, res) => {
  try {
    const { name, email, phone, date, time, doctor } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !date || !time || !doctor) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Associate booking with user from token if available
    const userId = req.user && req.user.id ? req.user.id : null;

    // Create and save the booking
    const booking = new Booking({
      name,
      email,
      phone,
      date,
      time,
      doctor,
      userId,
    });

    const savedBooking = await booking.save();
    console.log('New booking created:', savedBooking);

    res.status(201).json({
      message: 'Booking created successfully',
      booking: savedBooking,
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ message: 'Error creating booking' });
  }
});

// Cancel a booking (only owner)
route2.delete('/:id', verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (!booking.userId || booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }
    await booking.deleteOne();
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    console.error('Cancel booking error:', err);
    res.status(500).json({ message: 'Error cancelling booking' });
  }
});

// Edit a booking (only owner)
route2.put('/:id', verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (!booking.userId || booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to edit this booking' });
    }
    // Only allow updating certain fields
    const { name, email, phone, date, time, doctor } = req.body;
    booking.name = name || booking.name;
    booking.email = email || booking.email;
    booking.phone = phone || booking.phone;
    booking.date = date || booking.date;
    booking.time = time || booking.time;
    booking.doctor = doctor || booking.doctor;
    await booking.save();
    res.json({ message: 'Booking updated', booking });
  } catch (err) {
    console.error('Edit booking error:', err);
    res.status(500).json({ message: 'Error editing booking' });
  }
});

module.exports = route2;