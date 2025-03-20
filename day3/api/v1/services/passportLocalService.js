import passport from 'passport';
import pkg from 'passport-local';
import pool from "../../db/index.js";
import bcrypt from 'bcrypt';
const LocalStrategy = pkg.Strategy;

passport.use(new LocalStrategy(
    async function(email, password, done) {
        const query = `select * from users where email = $1`
        const resp = await pool.query(query, [email])
        if(resp.rows.length === 0){
            return done(null, false)
        }
        const user = resp.rows[0]
        const match = await bcrypt.compare(password, user.password)
        if(match){
            return done(null, user)
        }
        else{
            return done(null, false)
        }
    }
))

export default passport;