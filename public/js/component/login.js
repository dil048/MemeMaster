import {
  createAccount,
  signIn
} from "../firebase/firebaseActions.js"
let div = document.createElement("div");
div.className = "login-container";
let log = document.createElement("div");
let reg = document.createElement("div");
let title = document.createElement("h1");
let loginForm = document.createElement("form");
let registerForm = document.createElement("form");

function hide() {
  div.style.display = "none";
}

function show() {
  div.style.display = "block";
}

function loginSubmit() {
  let userEmail = document.getElementById('loginUser').value;
  let password = document.getElementById('loginPassword').value;
  signIn(userEmail, password, updateIcon);
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
  if (password1 !== password2) {
    alert("Password does not match");
    return false;
  }
  createAccount(userEmail, password1, alertMessage);
}

function alertMessage(success, message) {
  if (success) {
    div.style.display = "none"
    alert(message)
  }
  alert(message);
}

function render() {
  // set body styles
  document.body.style.color = "#000";
  document.body.style.textTransform = "capitalize";
  document.body.style.backgroundSize = "cover";
  // set main-div styles
  //div.style.background = "#fff";
  //div.style.margin = "30px auto";
  //div.style.padding = "10px";
  div.style.display = "none";
  log.style.display = "inline-block";
  log.style.color = "#000";
  log.style.margin = "5px";
  log.style.cursor = "pointer";
  log.id = "login";
  log.innerHTML = "login";
  log.onclick = () => {
    log.style.color = "#000";
    reg.style.color = "#888";
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  };

  reg.style.display = "inline-block";
  reg.style.color = "#888";
  reg.style.margin = "5px";
  reg.style.cursor = "pointer";
  reg.id = "register";
  reg.innerHTML = "register";
  reg.onclick = () => {
    reg.style.color = "#000";
    log.style.color = "#888";
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  };

  title.className = "loginTitle";
  title.textContent = "MemeMaster";

  // create some variables for styling
  var inputStyles = "";
  var btnStyles = "";

  // set loginForm styles
  loginForm.style.margin = "50px 30px 20px 30px";
  loginForm.className = "loginForm";
  loginForm.id = "loginForm";
  loginForm.onsubmit = (event) => {
    event.preventDefault();
    loginSubmit();
  };

  // set the elements and styles on the form
  loginForm.innerHTML =
    "<br/>" +
    "<input id='loginUser' type='text' placeholder='Username' style='" +
    inputStyles +
    "' /><br/><br/><br/>" +
    "<input id='loginPassword' type='password' placeholder='Password' style='" +
    inputStyles +
    "' /><br/>" +
    "<input id='loginBtn' type='submit' value='Login' style='" +
    btnStyles +
    "' />" +
    "<div id='firebaseui-auth-container'></div>";

  // set registerForm styles
  registerForm.style.margin = "50px 20px 20px 20px";
  registerForm.style.display = "none";
  registerForm.id = "registerForm";
  registerForm.onsubmit = (event) => {
    event.preventDefault();
    registerSubmit();
  };
  // set the elements and styles on the form
  registerForm.innerHTML =
    "<input id='registerEmail' type='email' placeholder='Your Email' style='" +
    inputStyles +
    "' /><br/>" +
    "<br/>" +
    "<input id='registerPassword1' type='password' placeholder='Password' style='" +
    inputStyles +
    "' /><br/>" +
    "<br/>" +
    "<input id='registerPassword2' type='password' placeholder='Confirm Password' style='" +
    inputStyles +
    "' /><br/>" +
    "<input id='registerBtn' type ='submit' value='Register' style='" +
    btnStyles +
    "' />";
  //let firebaseUIDiv = document.createElement('div');
  //firebaseUIDiv.id = "firebaseui-auth-container";
  // append the bottons and form on main-div
  div.appendChild(log);
  div.appendChild(title);
  div.appendChild(loginForm);
  div.appendChild(registerForm);
  //div.appendChild(firebaseUIDiv);
  div.appendChild(reg);

  // append main-div on the body
  document.body.appendChild(div);
  return div;
}

export {
  render,
  show
};