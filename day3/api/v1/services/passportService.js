import passport from "passport";
import pkg from 'passport-google-oauth20'
import config from "../../../config/index.js";
const GoogleStrategy = pkg.Strategy;


passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.callback_url
},
// significance of each argument in the callback function
// req: request object
// accessToken used to access the Google API
// refreshToken used to refresh the accessToken
// profile contains the user's profile information
// done is a callback function that is called after the strategy has completed its processing

    function(req, accessToken, refreshToken, profile, done) {
        console.log(req, accessToken, refreshToken, profile);
        return done(null, profile);
    }
))

export default passport;
