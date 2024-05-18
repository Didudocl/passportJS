// firebaseConfig.js
import fs from 'fs';
import admin from 'firebase-admin';

// Lee el archivo de credenciales de forma síncrona
const serviceAccount = JSON.parse(fs.readFileSync('./src/config/credentials.json'));

// Inicializa Firebase Admin SDK con el archivo de credenciales
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
export const db = admin.firestore();
