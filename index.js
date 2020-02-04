const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./middleware/logger');

const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const campaignsRouter = require('./campaigns/campaigns-router');
const organizationsRouter = require('./organizations/organizations-router');

const server = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(logger());

server.use('/api', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/campaigns', campaignsRouter);
server.use('/api/organizations', organizationsRouter);

server.get('/', (req, res, next) => {
  res.json({
    message: 'Welcome to our API',
  });
});

server.use((req, res) => {
  res.status(404).json({
    message: 'Route was not found',
  });
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: 'An internal error occurred, please try again later',
  });
});

if (!module.parent) {
  server.listen(port, host, () => {
    console.log(`\n*** Server Running on http://${host}:${port} ***\n`);
  });
}

module.exports = server;
