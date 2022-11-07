const pgp = require('pg-promise')();

const DATABASE_URL= process.env.DATABASE_URL ||'postgresql://code:code123@localhost:5432/my_greetings'

const config = { 
  connectionString : DATABASE_URL
}

if (process.env.NODE_ENV == 'production') {
  config.ssl = { 
    rejectUnauthorized : false
  }
}

const db = pgp(config);
module.exports = db;