import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "Assasinscreed2!",
    port: 5432,
});

export async function connectDB() {
    try {
        await pool.connect();
        return pool;
    }
    catch (err) {
    }
}


export async function isDbConnected() {
    const connection = await connectDB();
    if(connection) {
        return true;
    }
    else {
        return false;
    }
}


