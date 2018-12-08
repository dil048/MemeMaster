import {changePassword} from "../firebase/firebaseActions.js"
import {authentication} from "../firebase/credentials.js"

let changePwBtn = document.getElementById("changePwBtn");
let uploadBtn = document.getElementById("uploadBtn");
let changePwForm = document.createElement("form");
var user = authentication.currentUser;
var name, email, photoUrl, uid, emailVerified;
if(user) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
} else {
    console.log("user not signed in");
}
window.onload = () => {
    nameText = document.getElementById("usernameTag");
    nameText[0].innerHTML = "Username: " + user.displayName;
};

changePwBtn.onclick = () => {
    changePassword(user);

}



uploadBtn.onclick = () => {

}