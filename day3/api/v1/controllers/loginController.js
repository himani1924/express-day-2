import express from 'express';
import googlepassport from '../services/passportService.js'
import loginpassport from '../services/passportLocalService.js';
import githubpassport from '../services/passportGithub.js';
import { createUser } from '../services/signupServices.js';

const router = express.Router();

router.get('/google', googlepassport.authenticate('google', 
    { scope: ['email', 'profile'] }
));

router.get('/google/callback', googlepassport.authenticate('google',{
    session: false
}),
async (req, res) => {
    try {
        console.log('success', req.user);
        res.redirect('http://localhost:3000/api/v1/students');
    } catch (error) {
        console.log('catch of google auth', error);
    }
})

router.get('/github', githubpassport.authenticate('github',  { scope: ['read:user', 'user:email'] }))

router.get('/github/callback', githubpassport.authenticate('github',{
    session: false
}),
async (req, res) =>{
    try {
        console.log('success', req.email);

        res.redirect('http://localhost:3000/api/v1/students');
    } catch (error) {
        console.log('error in github callback', error);
        
    }
})



router.get('/signup', (req, res) => {
    res.render('signup');
});
router.post('/signup', async (req, res) =>{
    console.log(req.body);
    const {name, email, password} = req.body;
    const resp = await createUser(name, email, password);
    if(resp.success){
        return res.status(200).send(resp.message);
    }
    else{
        return res.status(400).send(resp.message);
    }
})

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', loginpassport.authenticate('local', {
    successRedirect: '/api/v1/students',
    failureRedirect: '/api/v1/login'
}));

export default router;