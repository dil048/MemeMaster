let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");
let defaultImage = "/public/default_picture.png"
class meme extends HTMLElement {
  connectedCallback() {
    this.shadow = this.attachShadow({mode:"open"});
    this.imgSrc = defaultImage;
    this.top = ""
    this.bottom = "";
    this.render({imgSrc : this.imgSrc,topText : this.top,bottomText : this.bottom});
  }
  render({imgSrc=null,topText=null,bottomText=null}){
    let img = new Image();
    canvas.id = 'uploadedImage';
    canvas.style.border = '1px solid #d3d3d3'
    this.imgSrc = (imgSrc!=null && imgSrc!=undefined) ? imgSrc : this.imgSrc ;
    img.src = this.imgSrc;
    this.top = (topText!=null && topText!=undefined) ? topText : this.top;
    this.bottom = (bottomText!=null && bottomText != undefined) ? bottomText : this.bottom;
    img.onload = () => {
      if(img.src!=defaultImage){
        canvas.width = img.width;
        canvas.height = img.height;
        context.font="100px Arial";
        context.clearRect(0,0,canvas.width,canvas.length);
        context.drawImage(img,0,0);
        context.fillText(this.top,200,500)
        context.fillText(this.bottom,200,700)
      }
    };
    this.shadow.appendChild(canvas);
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
