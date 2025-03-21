import pool from "../../db/index.js";
import bcrypt from 'bcrypt';

export const createUser = async (name, email, password) =>{
    
    try {
        if(!name || !email || !password){
            return {
                success: false,
                message: 'Please provide all the details'
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `insert into users (name, email, password) values ($1, $2, $3)`
        await pool.query(query, [name, email, hashedPassword])
        console.log('created user');
        return {
            success: true,
            message: 'User created'
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}
