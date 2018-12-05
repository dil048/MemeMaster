var config = {
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

  var uiConfig = {
    // Url to redirect to after a successful sign-in.
    signInSuccessUrl: "/",
    callbacks: {
      signInSuccess: function(user, credential, redirectUrl) {
        if (window.opener) {
          // The widget has been opened in a popup, so close the window
          // and return false to not redirect the opener.
          window.close();
          return false;
        } else {
          // The widget has been used in redirect mode, so we redirect to the signInSuccessUrl.
          return true;
        }
      }
    },
    signInOptions: [
      providers.GoogleAuthProvider.PROVIDER_ID,
      providers.FacebookAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: "https://www.google.com"
  };
  let ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded to include the FirebaseUI sign-in widget
  // within the element corresponding to the selector specified.
  ui.start("#firebaseui-auth-container", uiConfig);
export {db,authentication,providers}