import { render as loginRender } from "../component/login.js";
import { show } from "../component/login.js";
import { authentication } from "../firebase/credentials.js";
import { addMemeToAccount } from "../firebase/firebaseActions.js";

let canvas = document.getElementById("memeCreator");
let save = document.getElementById("saveToFireBase");
let copyText = document.getElementById("copyText");
let shortenLink = document.getElementById("shortenLink");
let downloadBtn = document.getElementById('btndownload');
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
downloadBtn.onclick = function(){
  download(canvas, 'myimage.png');
};

// Source from:  http://stackoverflow.com/questions/18480474/how-to-save-an-image-from-canvas
function download(canvas, filename) {
  /// create an "off-screen" anchor tag
  var lnk = document.createElement('a'), e;

  /// the key here is to set the download attribute of the a tag
  lnk.download = filename;

  /// convert canvas content to data-uri for link. When download
  /// attribute is set the content pointed to by link will be
  /// pushed as "download" in HTML5 capable browsers
  lnk.href = canvas.dataUrl();

  /// create a "fake" click-event to trigger the download
  if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window,
                    0, 0, 0, 0, 0, false, false, false,
                    false, 0, null);

    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
    lnk.fireEvent("onclick");
  }
}
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
    console.log(res.data);
    let url = res.data.link;
    shortenLink.value = url;
    let urlEncoded = "https://www.facebook.com/plugins/share_button.php?href=" + 
              encodeURI(url) + "&layout=button&size=small&mobile_iframe=true&width=59&height=20&appId";
    let facebook = document.createElement("iframe");
    facebook.src = urlEncoded;
    facebook.width = "59";
    facebook.height = "20";
    facebook.style = "border:none;overflow:hidden";
    facebook.scrolling = "no";
    facebook.frameBorder ="0";
    facebook.setAttribute("allowTransparency","true");
    facebook.setAttribute("allow","encrypted-media");

    let twitterScript = document.createElement("script");
    twitterScript.setAttribute("src","https://platform.twitter.com/widgets.js");
    twitterScript.setAttribute("charset","utf-8")
    let twitter = document.createElement("a");

    twitter.setAttribute("href", "https://twitter.com/share?ref_src=twsrc%5Etfw" );
    twitter.innerHTML = "Tweet";
    twitter.setAttribute("class","twitter-share-button");
    twitter.setAttribute("data-text","Check out this amazing meme");
    twitter.setAttribute("data-url",url);


    let wrapper = document.getElementById("socialMedia");
    wrapper.appendChild(twitterScript);
    wrapper.appendChild(facebook);
    wrapper.appendChild(twitter);


  }).catch((err)=>{
    console.log(err);
    alert("Error creating shorten link for the meme");
  });
}
