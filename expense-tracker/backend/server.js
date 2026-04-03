require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenses');

const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/expenses', expenseRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
