import pkg from 'pg';
import config from "../../config/index.js";
import util from "util";
import { query } from "express";

const { Pool } = pkg;
const sql_pool = new Pool({
    user : config.dbUser,
    host: config.dbhost,
    password: config.dbPassword,
    port: config.dbPort,
    database: config.database,
    idleTimeoutMillis: config.idleTimeoutMillis,
    connectionTimeoutMillis: config.connectionTimeoutMillis,
})

const pool = {
    query: (sql, args) =>{
        return util.promisify(sql_pool.query).call(sql_pool, sql, args)
    }
}
export default pool;