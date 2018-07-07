const mysql = require('mysql')
const DB_HOST = 'mysqldb'
const DB_USER = 'root'
const DB_PASSWORD = 'root' // should not be storing this in the clear...
const PRODUCTION_DB = 'test'

exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'

var state = {
  pool: null,
  mode: null
}

exports.connect = (done) => {
  state.pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: PRODUCTION_DB
  })
  done()
}

exports.get = () => {
  return state.pool
}
