let div = document.createElement("div");
let log = document.createElement("div");
let reg = document.createElement("div");
let loginForm = document.createElement("form");
let registerForm = document.createElement("form");

  function hide() {
    div.style.display = "none";
  }
  function show() {
    div.style.display = "block";
  }

  function loginSubmit(){
    let userEmail = document.getElementById('loginUser').value;
    let password = document.getElementById('loginPassword').value;
    console.log(userEmail);
    console.log(password);
    signIn(userEmail, password)
    return false;
  }

  function registerSubmit() {
    let userEmail = document.getElementById('registerEmail').value;
    let password1 = document.getElementById('registerPassword1').value;
    let password2 = document.getElementById('registerPassword2').value;
    if(password1 !== password2){
      alert("Password does not match");
      return false;
    }
    createAccount(userEmail,password1,this.alertMessage);
  }

  function alertMessage(success,message){
    if(success){
      div.style.display = "none"
      alert(message)
    }
    alert(message);
  }

  function loginRender() {
    // set body styles
    document.body.style.color = "#000";
    document.body.style.textTransform = "capitalize";
    document.body.style.backgroundSize = "cover";
    // set main-div styles
    div.style.background = "#fff";
    div.style.width = "300px";
    //div.style.margin = "30px auto";
    //div.style.padding = "10px";
    div.style.position = "absolute";
    div.style.borderRadius = "10px";
    div.style.border = "1px black solid";
    div.style.zIndex = 1;
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

    // create some variables for styling
    let inputStyles = "";
    let btnStyles = "";

    // set loginForm styles
    loginForm.style.margin = "50px 20px 20px 20px";
    loginForm.id = "loginForm";
    loginForm.onsubmit = (event)=>{
      event.preventDefault();
      this.loginSubmit();
    };

    // set the elements and styles on the form
    loginForm.innerHTML =
      "<label>username</label><br/>" +
      "<input id='loginUser' type='text' placeholder=' username' style='" +
      inputStyles +
      "' /><br/>" +
      "<label>password</label><br/>" +
      "<input id='loginPassword' type='password' placeholder='*********' style='" +
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
    registerForm.onsubmit = (event)=>{
      event.preventDefault();
      this.registerSubmit();
    };
    // set the elements and styles on the form
    registerForm.innerHTML =
      "<label>e-mail</label><br/>" +
      "<input id='registerEmail' type='email' placeholder='your email' style='" +
      inputStyles +
      "' /><br/>" +
      "<label>password</label><br/>" +
      "<input id='registerPassword1' type='password' placeholder='*************' style='" +
      inputStyles +
      "' /><br/>" +
      "<label>confirm password</label><br/>" +
      "<input id='registerPassword2' type='password' placeholder='*************' style='" +
      inputStyles +
      "' /><br/>" +
      "<input id='registerBtn' type ='submit' value='Register' style='" +
      btnStyles +
      "' />";
    //let firebaseUIDiv = document.createElement('div');
    //firebaseUIDiv.id = "firebaseui-auth-container";
    // append the bottons and form on main-div
    div.appendChild(log);
    div.appendChild(reg);
    div.appendChild(loginForm);
    div.appendChild(registerForm);
    //div.appendChild(firebaseUIDiv);

    // append main-div on the body
    document.body.appendChild(div);
    return div;
  }
