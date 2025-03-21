import passport from "passport";
import pkg from 'passport-google-oauth20'
import config from "../../../config/index.js";
import pool from "../../db/index.js";
import bcrypt from 'bcrypt';
const GoogleStrategy = pkg .Strategy;
import {Strategy as LocalStrategy} from 'passport-local'
import GithubStrategy from 'passport-github'

// google strategy for passport
passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.callback_url
},
    function(req, accessToken, refreshToken, profile, done) {
        console.log(req, accessToken, refreshToken, profile);
        return done(null, profile);
    }
))


// github strategy for passport
passport.use(new GithubStrategy({
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: config.GITHUB_CALLBACK_URL,
},
    function(req, accessToken, refreshToken, profile, done) {
        const email = profile.emails && profile.emails[0].value; 
        if (!email) {
            return done(null, false, { message: 'Email not available' });
        }
        const user = {
            id: profile.id,
            username: profile.username,
            email: email
        };
        return done(null, user);
    }
))

// local strategy for passport 
passport.use(new LocalStrategy({ 
    usernameField: 'email' 
},
    async function(email, password, done) {
        console.log('inside local strategy');
        const query = `select * from users where email = $1`
        const resp = await pool.query(query, [email])
        console.log('agter query');
        if(resp.rows.length === 0){
            return done(null, false)
        }
        console.log('user found');
        const user = resp.rows[0]
        console.log('user', user);
        const match = await bcrypt.compare(password, user.password)
        console.log('after compare');
        if(match){
            console.log('match');
            return done(null, user)
        }
        else{
            console.log('no match');
            return done(null, false)
        }
    }
))

passport.serializeUser((user, done) =>{
    console.log('inside serialize');
    done(null, user.email);
})

passport.deserializeUser(async (email, done)=>{
    try {
        const query = `select * from users where email = $1`
        const resp = await pool.query(query, [email])
        if(resp.rows.length === 0){
            return done(null, false)
        }
        done(null, resp.rows[0])
    } catch (error) {
        done(error, false)
    }
})

export default passport;
