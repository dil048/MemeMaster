let d = null;
window.onload = () => {
  d = loginRender();
};
let modal = document.getElementById("loginForm");
let login = document.getElementById("signInBtn");
let meme = document.getElementById("memeCreator");
let topTextInput = document.getElementById("topText");
let bottomTextInput = document.getElementById("bottomText");
let memeCreator = document.getElementById("memeCreator");
login.onclick = () => {
  d.style.display = "block";
};
topTextInput.oninput = ()=>{
  memeCreator.render({topText: topTextInput.value});
}
bottomTextInput.oninput = ()=>{
  memeCreator.render({bottomText: bottomTextInput.value});
}

