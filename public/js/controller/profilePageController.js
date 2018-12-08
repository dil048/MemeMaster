import {
  changePassword,
  getUserInfo,
  getUserMeme,
  updateIcon
} from "../firebase/firebaseActions.js";
import { authentication } from "../firebase/credentials.js";

let changePwBtn = document.getElementById("changePwBtn");
let changeBtn = document.getElementById("uploadBtn");
var modal = document.getElementById("myModal");
var signOutBtn = document.getElementById("signoutBtn");
var closeBtn = document.getElementById("closeBtn");
var confirmChangeBtn = document.getElementById("confirmChangeBtn");
let userInfo;
let recentMemeList = [];

window.onload = () => {
  authentication.onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
      getUserInfo(user, setUserInfo);
      getUserMeme(user.uid, setUpTable);
    } else {
      console.log("user not signed in");
    }
  });
  //nameText[0].innerHTML = "Username: " + user.displayName;
};
function setUserInfo(user, name, email, profileImgUrl) {
  let signinBtn = document.getElementById("signInBtn");
  signinBtn.id = "profileBtn";
  console.log("fajdhsfalkjsdfas");
  signinBtn.style.backgroundImage = "url(" + profileImgUrl + ")";
  console.log(signinBtn);

  let nameTag = document.getElementById("usernameTag");
  nameTag.textContent = "Username: " + name;

  let icon = document.getElementById("profileImg");
  icon.src = profileImgUrl;

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
function setUpTable(input) {
  for (let key in input) {
    recentMemeList.push(input[key]);
  }
  recentMemeList.sort((d1, d2) => {
    let date1 = new Date(d1.dateCreated);
    let date2 = new Date(d2.dateCreated);
    return date2 - date1;
  });
  for (let index in recentMemeList) {
    if (index >= 5) break;
    let memeRow = document.getElementById("meme");
    let dateRow = document.getElementById("dateCreated");

    let image = document.createElement("img");
    image.id = index;
    image.src = recentMemeList[index].memeUri;
    image.onclick = () => {
      localStorage.setItem("canvasSaved", JSON.stringify({
        background: recentMemeList[index].backgroundImageURL,
        top: recentMemeList[index].topText,
        bottom: recentMemeList[index].bottomText
      }));
      window.location.href = "index.html";
    }
    let th = document.createElement("th");
    th.append(image);
    memeRow.append(th);
    let th2 = document.createElement("th");
    let p = document.createElement("p");
    p.innerText = recentMemeList[index].dateCreated;
    th2.append(p);
    dateRow.append(th2);
    let th3 = document.createElement("th");
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    let deleteRow = document.getElementById("delete");
    // deleteBtn.onclick = () => {
    //   let key = null;
    //   for(key in input){
    //     if(input[key].)
    //   }
    // }
    th3.appendChild(deleteBtn);
    deleteRow.appendChild(th3);
  }
}
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
};
console.log(changeBtn.innerText);
changeBtn.onclick = () => {
  console.log("clicked");
  let imgCode = Math.floor(Math.random() * 1000 + 1);
  let URLString = "http://api.adorable.io/avatars/285/" + imgCode + ".png";
  let icon = document.getElementById("profileImg");
  icon.src = URLString;

  let signinBtn = document.getElementById("profileBtn");
  signinBtn.style.backgroundImage = "url(" + URLString + ")";

  console.log(URLString);
  updateIcon(userInfo.curruser, URLString);
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = event => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
