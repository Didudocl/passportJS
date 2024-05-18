import {db} from './firebaseConfig.js';

/**
 * Crea los usuarios por defecto en la base de datos Firestore.
 * @async
 * @function createUsers
 * @returns {Promise<void>}
 */
async function createUsers() {
  try {
    // Consulta la colección de usuarios en Firestore
    const usersSnapshot = await db.collection('users').get();
    // Si hay documentos en la colección, ya se crearon los usuarios
    if (!usersSnapshot.empty) return;

    // Crea los usuarios por defecto con los IDs de los roles correspondientes
    await Promise.all([
      db.collection('users').add({
        userName: "administrador",
        email: "admin@indama.cl",
        rolName: "admin",
        area: "Administración"
      }),
      db.collection('users').add({
        userName: "Cesár Segura",
        email: "csegura@indama.cl",
        rolName: "GO",
        area: "Operaciones"
      }),
      db.collection('users').add({
        userName: "Nelson González",
        email: "ngonzalez@indama.cl",
        rolName: "JP",
        area: "Producción"
      }),
      db.collection('users').add({
        userName: "Rolando Saez",
        email: "rolando.saez@indama.cl",
        rolName: "SP",
        area: "Producción"
      }),
      db.collection('users').add({
        userName: "José Reyes",
        email: "jreyes@indama.cl",
        rolName: "SP",
        area: "Producción"
      }),
      db.collection('users').add({
        userName: "Andys Franceschi",
        email: "afranceschi@indama.cl",
        rolName: "SP",
        area: "Producción"
      }),
      db.collection('users').add({
        userName: "Matías Elizalde",
        email: "matias.elizalde@indama.cl",
        rolName: "SP",
        area: "Producción"
      }),
      db.collection('users').add({
        userName: "Julio Gutiérrez",
        email: "julio.gutierrez@indama.cl",
        rolName: "JM",
        area: "Mantención"
      }),
      db.collection('users').add({
        userName: "Leonardo Alarcón",
        email: "lalarcon@indama.cl",
        rolName: "SM",
        area: "Mantención"
      }),
      db.collection('users').add({
        userName: "Leonard Rosales",
        email: "lrosales@indama.cl",
        rolName: "SM",
        area: "Mantención"
      }),
      db.collection('users').add({
        userName: "Juan Rubio",
        email: "juan.rubio@indama.cl",
        rolName: "SM",
        area: "Mantención"
      }),
      db.collection('users').add({
        userName: "Germán Millar",
        email: "german.millar@indama.cl",
        rolName: "AM",
        area: "Mantención"
      }),
      db.collection('users').add({
        userName: "Cristian Villegas",
        email: "cvillegas@indama.cl",
        rolName: "JPR",
        area: "Prevención"
      }),
      db.collection('users').add({
        userName: "Giovanna Opazo",
        email: "giovanna.opazo@indama.cl",
        rolName: "PR",
        area: "Prevención"
      }),
      db.collection('users').add({
        userName: "Sergio León",
        email: "sergio.leon@indama.cl",
        rolName: "PR",
        area: "Prevención"
      }),
      db.collection('users').add({
        userName: "Nicolás Aqueveque",
        email: "naqueveque@indama.cl",
        rolName: "JC",
        area: "Calidad"
      }),
      db.collection('users').add({
        userName: "Eduardo Saravia",
        email: "esaravia@indama.cl",
        rolName: "C",
        area: "Calidad"
      }),
      db.collection('users').add({
        userName: "Víctor Sáez",
        email: "vsaez@indama.cl",
        rolName: "P",
        area: "Calidad"
      }),
      db.collection('users').add({
        userName: "José Garcés",
        email: "jose.garces@indama.cl",
        rolName: "CG",
        area: "Control de gasto"
      }),
      db.collection('users').add({
        userName: "Felipe Astorga",
        email: "fastorga@indama.cl",
        rolName: "O",
        area: "Control de gasto"
      }),
      db.collection('users').add({
        userName: "Matías Contreras",
        email: "matias.contreras@indama.cl",
        rolName: "JSC",
        area: "Servicio al cliente"
      }),
      db.collection('users').add({
        userName: "Henry Reyes Zambrano",
        email: "hreyes@indama.cl",
        rolName: "D",
        area: "Servicio al cliente"
      }),
    ]);
    console.log("* => Usuarios creados exitosamente");
  } catch (error) {
    console.error(error);
  }
}

export { createUsers };
