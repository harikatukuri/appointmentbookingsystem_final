const route = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { verifyToken } = require('../middleware');

route.get('/', (req, res) => {
    res.send('Hello World! jwt');
})

route.post('/login', async(req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await User.findOne({ username });
    console.log(user);
    if(!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ name: username, role: 'admin', id : user._id }, 'secret');
    res.json({ token });
});

route.post('/register', async(req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    // Use Mongoose create to add user
    const user = await User.create({ username, password });
    console.log('User created', user);
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error('Register error', err);
    res.status(500).json({ message: 'Error creating user' });
  }
});

route.get('/profile', verifyToken, async (req, res) => {
  res.json({ user: req.user });
});

// return bookings for logged-in user
const Booking = require('../models/Booking');
route.get('/profile/bookings', verifyToken, async (req, res) => {
  try {
    const userId = req?.user?.id;
    if (!userId) return res.status(400).json({ message: 'Invalid user' });
    const bookings = await Booking.find({ userId });
    res.json({ bookings });
  } catch (err) {
    console.error('Error fetching user bookings', err);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

module.exports = route;