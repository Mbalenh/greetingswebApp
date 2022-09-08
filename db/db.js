const pgp = require('pg-promise')();

const DATABASE_URL= process.env.DATABASE_URL ||'postgres://dcizjcmy:p8wTJ3o5rpKJi2r12VBO0obH1DAyjPi5@surus.db.elephantsql.com/dcizjcmy'

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