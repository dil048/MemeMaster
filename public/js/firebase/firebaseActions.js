import {db,authentication} from './credentials.js'

function createAccount(email, password, callback){
  authentication.createUserWithEmailAndPassword(email,password).then((res)=>{
    let profileName = email.substring(0,email.indexOf('@'));
    console.log(profileName);
    let defaultPic = "";
    console.log(res.user.uid);
    db.ref('profile/' + res.user.uid).set({
      displayName: profileName,
      email: email,
      userId: res.user.uid, 
      photoURL: defaultPic
    })
    callback(true,profileName);
  }).catch((err)=>{
    console.log(err.message);
    callback(false,err.message);
  })
}
function signIn(email, password,callback){
  authentication.signInWithEmailAndPassword(email, password).then((res)=>{
    db.ref('profile/' + res.user.uid).once('value').then((snapshot) => {
      var userinfo = snapshot.val();
      callback(userinfo);
      console.log("before");
      console.log(authentication);
      console.log(authentication.currentUser);
    });
  }).catch((error)=>{
    console.log(error.message);
  })
}

function getUserInfo(user){
  db.ref('profile/' + user.uid).once('value').then((snapshot) => {
    var userinfo = snapshot.val();
    return userinfo;
  }).catch((err) => {
    console.log(err.message);
  })
}

function changePassword(user, newPassword){
  console.log(user);
  user.updatePassword(newPassword).then(function() {
    // Update successful.
  }).catch(function(error) {
    alert("Sorry, an error happened, cannot send reset password email");
    console.log(error);
  });
}

export {createAccount,signIn,changePassword,getUserInfo};
