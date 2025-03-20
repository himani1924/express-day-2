import pool from "../../db/index.js";

export const getAllStudents = async()=>{
    try {
        const res = await pool.query(`select * from students`,[])
        // console.log('query response: ', res.rows);
        return {
            success: true, 
            data: res.rows
        }
    } catch (error) {
        console.log('error in getting records: ', error.message);
        return {
            success: false,
            message: error.message
        }
    }
}

export const updateStudent = async(id, name, email, branch) =>{
    try {
        console.log('params: ', id, name, email, branch);
        const query = `update students set name= $2, email= $3, branch= $4 where id= $1`
        const res = await pool.query(query, [id, name, email, branch])
        return{
            success: true,
            message: 'Record updated successfully'
        }
    } catch (error) {
        console.log('error in updating records: ', error.message);
        return {
            success: false,
            message: error.message
        }
    }
}
export const createStudent = async(name, email, branch) =>{
    try {
        const query = `insert into students (name, email, branch) values ($1, $2, $3)`
        const res = await pool.query(query, [name, email, branch])
        return{
            success: true,
            message: 'Record created successfully'
        }
    } catch (error) {
        console.log('error in creating records: ', error.message);
        return {
            success: false,
            message: error.message
        }
    }
}
export const deleteStudent = async(id) =>{
    try {
        const query = `delete from students where id= $1`
        const res = await pool.query(query, [id])
        return{
            success: true,
            message: 'Record deleted successfully'
        }
    } catch (error) {
        console.log('error in deleting records: ', error.message);
        return {
            success: false,
            message: error.message
        }
    }
}
export const searchStudent = async(name) =>{
    try {
        const query = `select * from students where name ilike $1`
        const res = await pool.query(query, [name])
        return{
            success: true,
            data: res.rows
        }
    } catch (error) {
        console.log('error in deleting records: ', error.message);
        return {
            success: false,
            message: error.message
        }
    }
}