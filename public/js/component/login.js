import {
  createAccount,
  signIn
} from "../firebase/firebaseActions.js"

let signModal = document.getElementById("signinModal");
let reg = document.getElementById("register");
let log = document.getElementById("login");
let loginForm = document.getElementById("loginForm");
let registerForm = document.getElementById("registerForm");

// Hide the modal when not needed
function hide() {
  signModal.style.display = "none";
}
// Reveal the form needed
function show() {
  if(signModal) {
    signModal.style.display = "block";
  }
}

// Signin
function loginSubmit() {
  let userEmail = document.getElementById('loginUser').value;
  let password = document.getElementById('loginPassword').value;
  signIn(userEmail, password, updateIcon);
  document.getElementById('loginUser').value = "";
  document.getElementById('loginPassword').value = "";
  hide();
  return false;
}

// Update the icon on the top right corner
function updateIcon(user) {
  console.log("in icon");
  let signinBtn = document.getElementById("signInBtn");
  while (signinBtn.firstChild) {
    signinBtn.removeChild(signinBtn.firstChild);
  }
  signinBtn.id = "userBtn";
  let linkNode = document.createElement("a");
  linkNode.className = "displayNameLink";
  linkNode.href = "./profile.html";
  linkNode.innerText = user.displayName;
  signinBtn.appendChild(linkNode);
}

// Create user account
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