let d = null;
window.onload = () => {
  d = loginRender();
};
let modal = document.getElementById("loginForm");
let login = document.getElementById("signInBtn");
let topTextInput = document.getElementById("topText");
let bottomTextInput = document.getElementById("bottomText");
let memeCreator = document.getElementById("memeCreator");
let reset = document.getElementById("resetBtn");
let generate = document.getElementById("generateBtn");
login.onclick = () => {
  d.style.display = "block";
};
topTextInput.oninput = ()=>{
  memeCreator.render({topText: topTextInput.value});
}
bottomTextInput.oninput = ()=>{
  memeCreator.render({bottomText: bottomTextInput.value});
}
reset.onclick = () =>{
  topTextInput.value = "";
  bottomTextInput.value = "";
  memeCreator.reset();
}
generate.onclick = () =>{
  let topText = memeCreator.top;
  let bottomText = memeCreator.bottom;
  let image = memeCreator.imgSrc;
  let message = "is missing. Confirm to continue."
  let response = true;
  if(memeCreator.isDefaultPicture(image)){
    alert("Sorry, you cannot use the default picture. Select one from the table on the right");
    return;
  }
  if(!topText && !bottomText){
    message = "Both top text and bottom text " + message;
    response = confirm(message);
  }else if (!topText){
    message = "Top text " + message;
    response = confirm(message);
  }else if(!bottomText){
    message = "Bottom text "+ message;
    response = confirm(message);
  }
  if(response){
    window.canvasSaved = {
      background: image,
      top:topText,
      bottom:bottomText
    };
  }
}


