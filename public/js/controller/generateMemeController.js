import { render as loginRender } from "../component/login.js";
import { show } from "../component/login.js";
import { authentication } from "../firebase/credentials.js";
import { addMemeToAccount } from "../firebase/firebaseActions.js";

let canvas = document.getElementById("memeCreator");
let save = document.getElementById("saveToFireBase");
let copyText = document.getElementById("copyText");
let shortenLink = document.getElementById("shortenLink");
let meme = null;
let userId = null;
let memeUri = null;
window.onload = () => {
  meme = JSON.parse(localStorage.getItem("canvasSaved"));
  if (meme == null) {
    window.location.href = "../../404.html";
  }
  memeUri = "https://ucarecdn.com/" + meme.uuid + "/blob";
  canvas.render({
    imgSrc: meme.background,
    topText: meme.top,
    bottomText: meme.bottom
  });
  authentication.onAuthStateChanged(user => {
    if (user) {
      userId = user.uid;
    }
  });
  createTinyURL(memeUri);
};
save.onclick = () => {
  console.log("save click");
  console.log(userId);
  if (userId == null) {
    alert("You must login before you can save meme");
    return;
  };
  let memeInformation = {
    topText: meme.top,
    bottomText: meme.bottom,
    backgroundImage: meme.background,
    memeUri:memeUri
  }
  addMemeToAccount(userId,memeInformation);
};

copyText.onclick = ()=>{
  shortenLink.select();
  document.execCommand("copy");
}
function createTinyURL(url){
  let accessToken = '8324dba029eabe687eaa842b81d508a45b5b84f0';

  axios({
    method: 'post',
    url: 'https://api-ssl.bitly.com/v4/shorten',
    headers: {
      "content-type": "application/json",
      "authorization": "Bearer " + accessToken,
    },
    data: {
      long_url:url
    }
  }).then((res)=>{
    shortenLink.value = res.data.id;
    
  }).catch((err)=>{
    console.log(err);
    alert("Error creating shorten link for the meme");
  });
}
