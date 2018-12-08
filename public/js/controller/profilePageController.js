import {
  changePassword,
  getUserInfo,
  getUserMeme,
  updateIcon
} from "../firebase/firebaseActions.js";
import { authentication } from "../firebase/credentials.js";

let changePwBtn = document.getElementById("changePwBtn");
let uploadBtn = document.getElementById("uploadBtn");
var modal = document.getElementById("myModal");
var signOutBtn = document.getElementById("signoutBtn");
var closeBtn = document.getElementById("closeBtn");
var confirmChangeBtn = document.getElementById("confirmChangeBtn");
let userInfo;
let recentMemeList = [];

window.onload = () => {
  authentication.onAuthStateChanged(function(user) {
    if (user) {
      getUserInfo(user, setUserInfo);
      getUserMeme(user.uid,);
    } else {
      console.log("user not signed in");
    }
  });
  //nameText[0].innerHTML = "Username: " + user.displayName;
};
function setUserInfo(user,name,email,profileImgUrl){
    let signinBtn = document.getElementById("signInBtn");
    signinBtn.id = "profileBtn";
    console.log("fajdhsfalkjsdfas");
    signinBtn.style.backgroundImage = "url(" + profileImgUrl+ ")";
    console.log(signinBtn);

    let nameTag = document.getElementById("usernameTag");
    nameTag.textContent = "Username: " + name;

    let icon = document.getElementById("profileImg");
    icon.src = profileImgUrl;
}
function setUpTable(input){
  console.log(input);
}
function setUserInfo(user, name, email, profileImgUrl) {
  let signinBtn = document.getElementById("signInBtn");
  signinBtn.textContent = name;
  //signinBtn.innerHTML = "<img src = " + profileImgUrl + ">";

  userInfo = {
    curruser: user,
    username: name,
    useremail: email,
    userphotoUrl: profileImgUrl
    //userid : user.uid,
  };
}
changePwBtn.onclick = () => {
  modal.style.display = "block";
};

confirmChangeBtn.onclick = () => {
  let password1 = document.getElementById("newPassword");
  let password2 = document.getElementById("confirmPassword");
  let originalPassword = document.getElementById("originalPassword");
  if (password1.value != password2.value) {
    alert("New Passwords does not match. Please enter again.");
  } else {
    changePassword(userInfo.curruser, originalPassword.value, password1.value);
  }
  password1.value = "";
  password2.value = "";
  originalPassword.value = "";
};

signOutBtn.onclick = () => {
  authentication
    .signOut()
    .then(() => {
      console.log("Signed Out");
      alert("Sign Out successfull!");
      window.location.href = "./index.html";
    })
    .catch(error => {
      console.error("Sign Out Error", error);
    });
};

closeBtn.onclick = () => {
    modal.style.display = "none";
}

changeBtn.onclick = () => {
    let imgCode = Math.floor((Math.random() * 1000) + 1);
    let URLString = "http://api.adorable.io/avatars/285/" + imgCode + ".png";
    let icon = document.getElementById("profileImg");
    icon.src = URLString;

    let signinBtn = document.getElementById("profileBtn");
    signinBtn.style.backgroundImage = "url(" + URLString+ ")";

    console.log(URLString);
    updateIcon(userInfo.curruser, URLString);
};
uploadBtn.onclick = () => {};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
