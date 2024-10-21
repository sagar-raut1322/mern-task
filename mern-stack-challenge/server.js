// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb://localhost:27017/mern-challenge';

app.use(cors());
app.use(express.json());
app.use('/api', transactionRoutes);

// Add a simple route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the MERN Stack Project API');
});

// Connect to MongoDB without the deprecated options
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
