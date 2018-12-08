let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");
let uploadInput = document.createElement("input").cloneNode(true);
let defaultImage = "./default_picture.jpg"
let defaultTopText = "TIME TO MAKE";
let defaultBottomText = "MEME GREAT AGAIN!";

class meme extends HTMLElement {
  connectedCallback() {
    console.log("sd");
    this.shadow = this.attachShadow({mode:"open"});
    this.imgSrc = this.getAttribute("imgSrc");
    this.top = this.getAttribute("top");
    this.bottom = this.getAttribute("bottom");
    this.render({imgSrc : this.imgSrc,topText : this.top,bottomText : this.bottom});
  }
  render({imgSrc=null,topText=null,bottomText=null}){
    let img = new Image();
    canvas.id = 'uploadedImage';
    canvas.style.border = '1px solid #d3d3d3'
    this.imgSrc = (imgSrc!=null) ? imgSrc : this.imgSrc ;
    img.crossOrigin = "Anonymous"
    img.src = this.imgSrc;
    this.top = (topText!=null) ? topText : this.top;
    this.bottom = (bottomText!=null) ? bottomText : this.bottom;
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.font="50 Arial";
        context.clearRect(0,0,canvas.width,canvas.length);
        context.drawImage(img,0,0);
        context.fillText(this.top,0,200)
        context.fillText(this.bottom,0,300)
    };
    this.shadow.appendChild(canvas);
  }
  reset(){
    location.reload();
  }
  dataUrl(){
    return canvas.toDataURL();
  }
}

try {
  customElements.define("meme-canvas", meme);
} catch (err) {
  const h3 = document.createElement("h3");
  h3.innerHTML =
    "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!";
  document.body.appendChild(h3);
}
