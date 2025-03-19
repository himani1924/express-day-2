import express from 'express';
import {createStudent, deleteStudent, getAllStudents, searchStudent, updateStudent} from '../services/studentServices.js'
const router = express.Router();



router.get('/', async(req, res) =>{
    try {
        const resp = await getAllStudents()
        
        if(resp.success){
            if(resp.data.length === 0){
                return res.status(200).send('No records found')
            }
            return res.status(200).send(resp.data)
        }
        else{
            throw new Error('Error in get api')
        }
    } catch (error) {
        console.log('error in get api controller: ', error.message);
        return res.status(400).send({message: error.message || 'Error in get api controller'})
    }
})

router.put('/update', async(req, res) =>{
    try {
        console.log(req.body);
        const {id, name, email, branch} = req.body
        if(!id || !name || !email || !branch){
            return res.status(400).send('Invalid input')
        }
        const resp = await updateStudent(id, name, email, branch)
        
        if(resp.success){
            return res.status(200).send(resp.message)
        }
        else{
            throw new Error('Error in put api')
        }
    } catch (error) {
        console.log('error in put api controller: ', error.message);
        return res.status(400).send({message: error.message || 'Error in put api controller'})
    }
})

router.post('/add', async(req, res) =>{
    try {
        const { name, email, branch} = req.body
        if(!name || !email || !branch){
            return res.status(400).send('Invalid input')
        }
        const resp = await createStudent( name, email, branch)
        
        if(resp.success){
            return res.status(200).send(resp.message)
        }
        else{
            throw new Error('Error in post api')
        }
    } catch (error) {
        console.log('error in api controller: ', error.message);
        return res.status(400).send({message: error.message || 'Error in api controller'})
    }
})

router.delete('/delete', async(req, res) =>{
    try {
        const {id} = req.body
        if(!id){
            return res.status(400).send('Invalid input')
        }
        const resp = await deleteStudent(id)
        
        if(resp.success){
            return res.status(200).send(resp.message)
        }
        else{
            throw new Error('Error in delete api')
        }
    } catch (error) {
        console.log('error in delete api controller: ', error.message);
        return res.status(400).send({message: error.message || 'Error in delete api controller'})
    }
})
router.get('/search', async(req, res) =>{
    try {
        const {name} = req.body
        const resp = await searchStudent(name)
        
        if(resp.success){
            if(resp.data.length === 0){
                return res.status(200).send('No records found')
            }
            return res.status(200).send(resp.data)
        }
        else{
            throw new Error('Error in search api')
        }
    } catch (error) {
        console.log('error in search api controller: ', error.message);
        return res.status(400).send({message: error.message || 'Error in search api controller'})
    }
})
export default router;