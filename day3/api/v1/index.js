import studentController from './controllers/studentController.js'
import express from 'express'
const router = express.Router();
router.use('/students', studentController);

export default router;