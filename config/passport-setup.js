import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { keyID, keySecret } from './configEnv.js';

export function passportSetup() {
    passport.use(
        new GoogleStrategy({
            callbackURL: '/auth/google/redirect',
            clientID: keyID,
            clientSecret: keySecret
        }, (accessToken, refreshToken, profile, done) => {
            // passport callback function
            console.log("Perfil: ", profile);
            console.log("Token de refresco: ",refreshToken);
            console.log("Token de acceso: ", accessToken);
            console.log("Done: ", done);
        })
    );
};

export default passportSetup;
