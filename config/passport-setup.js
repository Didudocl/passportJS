import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { keyID, keySecret } from './configEnv.js';
import {db} from '../index.js';

passport.serializeUser((user, done) => {
    done(null, user.googleID);
})

// ! Me quedo dando vuelta este xaval
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
            callbackURL: '/auth/google/redirect',
            clientID: keyID,
            clientSecret: keySecret
        }, async (accessToken, refreshToken, profile, done) => {
            // passport callback function
            try {
                const usuarioRef = await db.collection('users').doc(profile.id).get();
                if (usuarioRef.exists) {
                    const usuarioDoc = {
                        googleID: usuarioRef._fieldsProto.googleID.stringValue,
                        name: usuarioRef._fieldsProto.name.stringValue
                    };
                    return done(null, usuarioDoc);
                } else {
                // Guardar el usuario en la base de datos de Firebase
                await db.collection('users').doc(profile.id).set({
                    googleID: profile.id,
                    name: profile.displayName,
                });

                // Éxito: devolver el usuario guardado
                const user = { googleID: profile.id , fullName: profile.displayName }; // Crear un objeto de usuario con la información relevante
                return done(null, user);
                }
            } catch (error) {
                // Error al guardar el usuario
                console.log('Error en passport-setup.js -> pasportSetup()', error);
                return done(error, null);
            }
        })
    );
};
