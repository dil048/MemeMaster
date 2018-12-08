import { db, authentication } from "./credentials.js";

// Create user account with input email and password
function createAccount(email, password, callback) {
  authentication
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      let profileName = email.substring(0, email.indexOf("@"));
      let defaultPic = "http://api.adorable.io/avatars/285/9794874.png";
      db.ref("profile/" + res.user.uid).set({
        displayName: profileName,
        email: email,
        userId: res.user.uid,
        photoURL: defaultPic
      });
      callback(true, profileName);
    })
    .catch(err => {
      console.log(err.message);
      callback(false, err.message);
    });
}

// Sign in with credentials provided by the user
function signIn(email, password, callback) {
  authentication
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      db.ref("profile/" + res.user.uid)
        .once("value")
        .then(snapshot => {
          var userinfo = snapshot.val();
          callback(userinfo);
          console.log("before");
          console.log(authentication);
          console.log(authentication.currentUser);
        });
    })
    .catch(error => {
      alert("Failed to sign in, please try again.");
      console.log(error.message);
    });
}

// Get user informations, such as display name and photo
function getUserInfo(user, setUserInfo) {
  var userinfo;
  db.ref("profile/" + user.uid)
    .once("value")
    .then(snapshot => {
      userinfo = snapshot.val();
      setUserInfo(
        user,
        userinfo.displayName,
        userinfo.email,
        userinfo.photoURL
      );
      return userinfo;
    })
    .catch(err => {
      console.log(err.message);
    });
}

// Change user's photo
function updateIcon(user, URLString) {
  db.ref("profile/" + user.uid).update({photoURL: URLString});
}

// Change password, login in first to verify that the current password is correct
function changePassword(user, oriPw, newPw) {
  authentication
    .signInWithEmailAndPassword(user.email, oriPw)
    .then(res => {
      res.user
        .updatePassword(newPw)
        .then(function() {
          alert("Change password successfully!");
        })
        .catch(function(error) {
          alert("Change password failed!");
          console.log("cannot update");
          console.log(error.mesage);
        });
    })
    .catch(error => {
      alert("Please ente valid password to change your password.");
      console.log("cannot login");
      console.log(error.message);
    });
}

// Add meme to user meme history
function addMemeToAccount(uid, meme) {
  let topText = meme.topText;
  let bottomText = meme.bottomText;
  let imageURL = meme.backgroundImage;
  let memeUri = meme.memeUri;
  var d = new Date().toString();
  db.ref("profile/" + uid + "/memes")
    .push({
      topText: topText,
      bottomText: bottomText,
      backgroundImageURL: imageURL,
      memeUri: memeUri,
      dateCreated: d 
    })
    .then(res => {
      console.log(res);
      alert("Success");
    })
    .catch(error => {
      console.log(error.message);
    });
}

// Get all of user's memes
function getUserMeme(uid,callback) {
  db.ref("profile/" + uid + "/memes")
    .once("value")
    .then(snapshot => {
      console.log(snapshot.val());
      callback(snapshot.val());
    });
}

// Delete user's meme
function deleteMeme(uid,memeId){
  console.log("profile/" + uid + "/memes/"+memeId);
  db.ref("profile/" + uid + "/memes").child(memeId).remove();
}
export { createAccount, signIn, changePassword, getUserInfo, addMemeToAccount,getUserMeme,updateIcon,deleteMeme };
