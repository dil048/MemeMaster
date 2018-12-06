let canvas = document.createElement('canvas');
class meme extends HTMLElement {
  connectedCallback() {
    this.shadow = this.attachShadow({mode:"open"});
    this.imgSrc = this.getAttribute("imgSrc");
    this.top = this.getAttribute("top");
    this.bottom = this.getAttribute("bottom");
    this.render();
  }
  updateBackGround(src){
    this.imgSrc = src;
    this.top = this.getAttribute("top");
    this.bottom = this.getAttribute("bottom");
    this.render();
  } 
  render(){
    var img = new Image();
    canvas.width = '1500';
    canvas.height = '800';
    canvas.id = 'uploadedImage';
    canvas.style.border = '1px solid #d3d3d3'
    console.log(this.imgSrc);
    img.src = this.imgSrc;
    let context = canvas.getContext("2d");
    context.font="100px Georgia"
    img.onload = () => {
      console.log(img.width);
      context.drawImage(img,200,200);
      context.fillText(this.top,200,500)
      context.fillText(this.bottom,200,700)
      console.log(context);
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
