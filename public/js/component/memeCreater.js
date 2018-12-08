let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");
let uploadInput = document.createElement("input").cloneNode(true);
let defaultImage = "img/default_picture.jpg"
let defaultTopText = "TIME TO MAKE";
let defaultBottomText = "MEME GREAT AGAIN!";

class meme extends HTMLElement {
  connectedCallback() {
    console.log("sd");
    this.shadow = this.attachShadow({mode:"open"});
    this.imgSrc = '';
    this.top = '';
    this.bottom = '';
  }
  render({imgSrc=null,topText=null,bottomText=null,defaultSetting=false}){
    let img = new Image();
    canvas.id = 'uploadedImage';
    canvas.style.border = '1px solid #d3d3d3'
    this.imgSrc = (imgSrc!=null) ? imgSrc : this.imgSrc ;
    img.crossOrigin = "Anonymous"
    this.top = (topText!=null) ? topText : this.top;
    this.bottom = (bottomText!=null) ? bottomText : this.bottom;
    console.log(defaultSetting);
    if(defaultSetting){
      this.top = defaultTopText;
      this.bottom = defaultBottomText;
      this.imgSrc = defaultImage;
    }
    img.src = this.imgSrc;
    console.log(imgSrc);
    img.onload = () => {
        canvas.width = 500;
        canvas.height = 400;
        context.fillStyle = 'white';
        context.strokeStyle = 'black 4px';
        context.font = "bolder 50px impact";
        context.lineWidth = 4;
        context.textAlign = "center";
        var hRatio = canvas.width/img.width;
        var vRatio = canvas.height/img.height;
        var ratio  = Math.min(hRatio, vRatio);
        var centerShift_x = (canvas.width - img.width*ratio) / 2;
        var centerShift_y = (canvas.height - img.height*ratio) / 2;  
        context.clearRect(0,0,canvas.width, canvas.height);
        context.drawImage(img, 0,0, img.width, img.height,
          centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);
        context.textBaseline="top"; 
        console.log((canvas.height - img.height*ratio)/2);
        console.log(canvas.height);
        context.fillText(this.top, 250, (canvas.height - img.height*ratio)/2, img.width*ratio);
        context.strokeText(this.top, 250, (canvas.height - img.height*ratio)/2, img.width*ratio);
        context.textBaseline="bottom"; 
        context.fillText(this.bottom, 250, 400 - (canvas.height - img.height*ratio)/2,img.width*ratio);
        context.strokeText(this.bottom, 250, 400 - (canvas.height - img.height*ratio)/2, img.width*ratio);
    };
    this.shadow.appendChild(canvas);
  }

  drawImageScaled(img, ctx) {
    var canvas = ctx.canvas ;

  }
  reset(){
    localStorage.removeItem("canvasSaved");
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
