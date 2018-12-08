import {
  changePassword,
  getUserInfo,
  getUserMeme,
  updateIcon,
  deleteMeme
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
  // Get user information and set up meme history
  authentication.onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
      getUserInfo(user, setUserInfo);
      getUserMeme(user.uid, setUpTable);
    } else {
      console.log("user not signed in");
    }
  });
};

// callback function to set up information
function setUserInfo(user, name, email, profileImgUrl) {
  let signinBtn = document.getElementById("signInBtn");
  signinBtn.id = "profileBtn";
  signinBtn.style.backgroundImage = "url(" + profileImgUrl + ")";

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

// Show change password modal
changePwBtn.onclick = () => {
  modal.style.display = "block";
};

// Set up most recent memes
function setUpTable(input) {
  for (let key in input) {
    recentMemeList.push(input[key]);
  }
  let label = document.getElementById("title");
  label.id = "memeTablePrompt";
  if (recentMemeList.length == 0) {
    label.innerText = "No memes found, create some now!";
    return;
  } else {
    label.innerText = "Here are some of the most recent memes you have created";
  
  
  }
  // sort base on date
  recentMemeList.sort((d1, d2) => {
    let date1 = new Date(d1.dateCreated);
    let date2 = new Date(d2.dateCreated);
    return date2 - date1;
  });


  for (let index in recentMemeList) {
    if (index >= 5) break; // fetch 5 most recent meme
    //let memeRow = document.getElementById("meme");
    //let dateRow = document.getElementById("dateCreated");
    let table = document.getElementById("table");
    let image = document.createElement("img");
    image.id = index;
    image.src = recentMemeList[index].memeUri;
    console.log("adding");
    // click on the meme to edit or create new one
    image.onclick = () => {
      localStorage.setItem(
        "canvasSaved",
        JSON.stringify({
          background: recentMemeList[index].backgroundImageURL,
          top: recentMemeList[index].topText,
          bottom: recentMemeList[index].bottomText
        })
      );
      window.location.href = "index.html";
    };

    // Generate each row of cell
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.append(image);
    tr.appendChild(td1);
    let td2 = document.createElement("td");
    let p = document.createElement("p");
    p.innerText = recentMemeList[index].dateCreated;
    td2.append(p);
    tr.appendChild(td2);
    let td3 = document.createElement("td");
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "signoutBtn";
    // Delete button
    deleteBtn.onclick = () => {
      let key = null;
      for (key in input) {
        if (input[key].memeUri == recentMemeList[index].memeUri) {
          break;
        }
      }
      if (confirm("Are you sure you want to delete this meme?")) {
        deleteMeme(userInfo.curruser.uid, key);
        location.reload();
      }
    };
    td3.appendChild(deleteBtn);
    tr.appendChild(td3);
    table.append(tr);
  }
}


// Change password confirmation
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

// Randomly change the icon
changeBtn.onclick = () => {
  console.log("clicked");
  let imgCode = Math.floor(Math.random() * 1000 + 1);
  // Use adorable.io avatars to randomly generate icon user.
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
