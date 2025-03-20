import passport from "passport";
import pkg from 'passport-github'
import config from "../../../config/index.js";
const GithubStrategy = pkg.Strategy;


passport.use(new GithubStrategy({
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: config.GITHUB_CALLBACK_URL,
},
    function(req, accessToken, refreshToken, profile, done) {
        // console.log(req, accessToken, refreshToken, profile);
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

export default passport;
