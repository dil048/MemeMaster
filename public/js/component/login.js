import {
  createAccount,
  signIn
} from "../firebase/firebaseActions.js"

let signModal = document.getElementById("signinModal");
let reg = document.getElementById("register");
let log = document.getElementById("login");
let loginForm = document.getElementById("loginForm");
let registerForm = document.getElementById("registerForm");

function hide() {
  signModal.style.display = "none";
}

function show() {
  if(signModal) {
    signModal.style.display = "block";
  }
}

function loginSubmit() {
  let userEmail = document.getElementById('loginUser').value;
  let password = document.getElementById('loginPassword').value;
  signIn(userEmail, password, updateIcon);
  document.getElementById('loginUser').value = "";
  document.getElementById('loginPassword').value = "";
  hide();
  return false;
}

function updateIcon(user) {
  console.log("in icon");
  let signinBtn = document.getElementById("signInBtn");
  while (signinBtn.firstChild) {
    signinBtn.removeChild(signinBtn.firstChild);
  }
  signinBtn.id = "userBtn";
  let linkNode = document.createElement("a");
  linkNode.className = "displayNameLink";
  //TODO: Need to get user's link
  linkNode.href = "./profile.html";
  //TODO: Get the link for the profile pic
  //let profilePic = document.createElement("img");
  //profilePic.src = 
  linkNode.innerText = user.displayName;
  signinBtn.appendChild(linkNode);
}

function registerSubmit() {
  let userEmail = document.getElementById('registerEmail').value;
  let password1 = document.getElementById('registerPassword1').value;
  let password2 = document.getElementById('registerPassword2').value;
  document.getElementById('registerEmail').value = "";
  document.getElementById('registerPassword1').value = "";
  document.getElementById('registerPassword2').value = "";
  if (password1 !== password2) {
    alert("Password does not match");
    return false;
  }
  createAccount(userEmail, password1, alertMessage);
}

function alertMessage(success, message) {
  if (success) {
    signModal.style.display = "none"
    alert("Successfully create account! Logging in now.");
  }
}

function render() {
  if(reg) {
    reg.onclick = () => {
      loginForm.style.display = "none";
      registerForm.style.display = "block";
    };
  }

  if(log) {
    log.onclick = () => {
      registerForm.style.display = "none";
      loginForm.style.display = "block";
    };
  }

  if(loginForm) {  
    loginForm.onsubmit = (event) => {
      event.preventDefault();
      loginSubmit();
    };
  }

  if(registerForm) {
    registerForm.onsubmit = (event) => {
      event.preventDefault();
      registerSubmit();
    };
  } 

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (signModal) {
    if (event.target == signModal) {
      signModal.style.display = "none";
    }
  }
}

}

export {
  render,
  show
};