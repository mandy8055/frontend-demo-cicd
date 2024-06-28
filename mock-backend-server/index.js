const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const protectedRoute = require('./routes/demoProtectedRoute');
const cors = require('cors');

require('dotenv').config({ path: __dirname + '/.env' });

const app = express();
app.use(
  cors({
    origin: 'http://localhost:4200', // Allow only this origin
    credentials: true, // Allow cookies to be sent with requests
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/v1', protectedRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
