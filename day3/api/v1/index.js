import studentController from './controllers/studentController.js'
import loginController from './controllers/loginController.js'
import express from 'express'
const router = express.Router();

router.use('/auth', loginController);
router.use('/students', studentController);

export default router;