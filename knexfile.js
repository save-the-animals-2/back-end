require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
  },
  test: {
    client: 'pg',
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_TEST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
  },
  production: {
    client: 'pg',
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    connection: process.env.DATABASE_URL,
  },
};
