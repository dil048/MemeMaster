import { render as loginRender } from "../component/login.js";
import { show } from "../component/login.js";
import {
  authentication
} from "../firebase/credentials.js"
import {
  getUserInfo
} from "../firebase/firebaseActions.js"
let d = null;
window.onload = () => {
  d = loginRender();
  memeCreator.render({defaultSetting:true});
  topTextInput.value = memeCreator.top;
  bottomTextInput.value = memeCreator.bottom;
  authentication.onAuthStateChanged(function(user) {
    if (user) {
        console.log("signed in");
        getUserInfo(user, updateProfileBtn);
    } else {
        console.log("user not signed in");
    }
  });
};

function updateProfileBtn(user, name, email, profileImgUrl){
  let signinBtn = document.getElementById("signInBtn");
  signinBtn.innerText = name;
  userInfo = {
      curruser : user, 
      username : name,
      useremail : email,
      userphotoUrl : profileImgUrl,
      //userid : user.uid,
  }
}

let login = document.getElementById("signInBtn");
let topTextInput = document.getElementById("topText");
let bottomTextInput = document.getElementById("bottomText");
let memeCreator = document.getElementById("memeCreator");
let reset = document.getElementById("resetBtn");
let generate = document.getElementById("generateBtn");
login.onclick = () => {
  show();
};
topTextInput.oninput = () => {
  memeCreator.render({ topText: topTextInput.value });
};
bottomTextInput.oninput = () => {
  memeCreator.render({ bottomText: bottomTextInput.value });
};
reset.onclick = () => {
  memeCreator.reset();
};
generate.onclick = () => {
  let topText = memeCreator.top;
  let bottomText = memeCreator.bottom;
  let image = memeCreator.imgSrc;
  let message = "is missing. Confirm to continue.";
  let response = true;
  if (!topText && !bottomText) {
    message = "Both top text and bottom text " + message;
    response = confirm(message);
  } else if (!topText) {
    message = "Top text " + message;
    response = confirm(message);
  } else if (!bottomText) {
    message = "Bottom text " + message;
    response = confirm(message);
  }
  if (response) {
    let body = new FormData();
    var file = createBlob(memeCreator.dataUrl());
    body.append("file", file);
    body.append("UPLOADCARE_PUB_KEY", "acf2010e6106f7bff218");
    body.append("UPLOADCARE_STORE", "auto");
    axios
      .post("https://upload.uploadcare.com/base/", body)
      .then((res)=> {
        let uuid = res.data.file;
        localStorage.setItem("canvasSaved", JSON.stringify({
          uuid:uuid,
          background: image,
          top: topText,
          bottom: bottomText
        }));
        window.location.href = "generatedMeme.html";
      })
      .catch(function(error) {
        console.log(error.message);
        alert("There was an error generating meme");
      });
  }
};

function createBlob(dataURL) {
  var BASE64_MARKER = ";base64,";
  if (dataURL.indexOf(BASE64_MARKER) == -1) {
    var parts = dataURL.split(",");
    var contentType = parts[0].split(":")[1];
    var raw = decodeURIComponent(parts[1]);
    return new Blob([raw], { type: contentType });
  }
  var parts = dataURL.split(BASE64_MARKER);
  var contentType = parts[0].split(":")[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;

  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}
