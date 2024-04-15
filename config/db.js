import pkg from "pg";
import "dotenv/config";
const { Pool } = pkg;
const { DB_CONNECT_STRING } = process.env; //DB_CONNECT_STRING_RENDER

const config = {
  connectionString: DB_CONNECT_STRING,
  idleTimeoutMillis: 0,
  allowExitOnIdle: true,
};

const pool = new Pool(config);

export default pool;
