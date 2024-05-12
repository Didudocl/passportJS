import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { keyID, keySecret } from './configEnv.js';
import {db} from '../index.js';

//! Buscar la optimización y organización de codigo

let usuarioDoc;

// * Se utiliza para convertir el objeto de usuario en un id unico, que se almacena en la sesión.
passport.serializeUser((user, done) => {
    done(null, user.googleID);  
})

// * Se utiliza para recuperar el objeto de usuario completo a partir del id unico almacenado en la sesión.
passport.deserializeUser((id, done) => {
    // Recupera el usuario de la base de datos usando el ID único
    db.collection('users').doc(id).get()
        .then(doc => {
            const user = doc.data();
            done(null, user);
        })
        .catch(err => {
            done(err, null);
        });
});

export function passportSetup() {
    passport.use(
        new GoogleStrategy({
            callbackURL: 'http://localhost:3000/auth/google/redirect',
            clientID: keyID,
            clientSecret: keySecret,
            scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'],
        }, async (accessToken, refreshToken, profile, done) => {
            // passport callback function
            try {
                const usuarioRef = await db.collection('users').doc(profile.id).get();
                if (usuarioRef.exists) {
                    usuarioDoc = {
                        googleID: usuarioRef._fieldsProto.googleID.stringValue,
                        name: usuarioRef._fieldsProto.name.stringValue,
                        email: profile.emails[0].value,
                        token: accessToken
                    };
                    return done(null, usuarioDoc);
                } else {
                // Guardar el usuario en la base de datos de Firebase
                await db.collection('users').doc(profile.id).set({
                    googleID: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value
                });
                // Éxito: devolver el usuario guardado
                usuarioDoc = { googleID: profile.id , fullName: profile.displayName, email: profile.emails[0].value, token: accessToken }; 
                return done(null, usuarioDoc);
                }
            } catch (error) {
                // Error al guardar el usuario
                console.log('Error en passport-setup.js -> pasportSetup()', error);
                return done(error, null);
            }
        })
    );
};

export {usuarioDoc};