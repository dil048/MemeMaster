let config = {
  apiKey: "AIzaSyD2zBrW2NwvaS8kd4H_OzEg-FnWkQBUZvc",
  authDomain: "mememaster-d6e15.firebaseapp.com",
  databaseURL: "https://mememaster-d6e15.firebaseio.com",
  projectId: "mememaster-d6e15",
  storageBucket: "mememaster-d6e15.appspot.com",
  messagingSenderId: "203785046007"
};
firebase.initializeApp(config);
let db = firebase.database();
let authentication = firebase.auth();
let providers = firebase.auth;

export { db, authentication, providers };
