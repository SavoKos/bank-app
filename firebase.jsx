import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

let app = '';

if (!firebase.apps.length)
  app = firebase.initializeApp({
    apiKey: 'AIzaSyDNiTGH7UUEGhckMGCwXgbPtkczdkdoflg',
    authDomain: 'excellence-holdings.firebaseapp.com',
    databaseURL: 'https://excellence-holdings-default-rtdb.firebaseio.com',
    projectId: 'excellence-holdings',
    storageBucket: 'excellence-holdings.appspot.com',
    messagingSenderId: '888008656838',
    appId: '1:888008656838:web:3eca889edf4c57a90294c7',
    measurementId: 'G-J4WCP7LH3L',
  });
else app = firebase.app();
console.log(firebase, app);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
export default app;
