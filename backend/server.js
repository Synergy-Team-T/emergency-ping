require('dotenv').config()

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth');
const calamitiesRouter = require('./routes/calamities');
const locationGroupsRouter = require('./routes/locationGroups');
const usersRouter = require('./routes/users');
const userStatusRouter = require('./routes/userStatus');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample route
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Register routers
const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/calamities', calamitiesRouter);
apiRouter.use('/locations/groups', locationGroupsRouter);
apiRouter.use('/users/status', userStatusRouter);
apiRouter.use('/users', usersRouter);
app.use('/api', apiRouter);

const onStartup = async () => {
  console.log('On startup.');
}

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfully connected to DB.');
  })
  .catch((error) => {
    console.log(error);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});