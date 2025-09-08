require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const adminAuth = require('./middleware/authMiddleware');
const path = require('path');
const userAuthRoutes = require('./routes/userAuth');
const adminAuthRoutes = require('./routes/adminAuth');
const categoryRoutes = require('./routes/categories');
const subpageRoutes = require('./routes/subpages');
const featuredSolutionsRoutes = require('./routes/featuredSolutions');
const clientsRoutes = require('./routes/clients');
const uploadRoute = require('./routes/upload');
const blogRoutes = require("./routes/blogs");
const JoinTalent = require("./routes/JoinTalent");
const teamUpRoutes = require("./routes/teamUpRoutes");
const contactRoutes = require("./routes/contact");
const userRoutes = require('./routes/userRoutes');
const subscriptionRoutes = require('./routes/subscriptions');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'https://innovative-staffing.vercel.app',
    'https://innovative-staffing-v7jj.vercel.app'
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// Public routes
app.use('/api/users', userAuthRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subpages', subpageRoutes);
app.use('/api/featuredSolutions', featuredSolutionsRoutes);
app.use('/api/clients', clientsRoutes);
app.use("/api/blogs", blogRoutes);
// Admin login route - public, no token required
app.use('/api/admin', adminAuthRoutes);
app.use('/api/users', userRoutes);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/api/upload', uploadRoute);
app.use("/api/JoinTalent", JoinTalent);
app.use("/api/teamup", teamUpRoutes);
app.use("/api/contact", contactRoutes);
app.use('/api/subscriptions', subscriptionRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});