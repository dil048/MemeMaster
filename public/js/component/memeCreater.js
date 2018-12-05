let canvas = document.createElement('canvas');
class meme extends HTMLElement {
  connectedCallback() {
    this.createShadowRoot();
    //this.text = this.getAttribute("text");
    //this.size = this.getAttribute("font-size");
    this.render();
  }
  render(){
    var img = new Image();
    canvas.width = '240';
    canvas.height = '270';
    canvas.style.border = '1px solid #d3d3d3'

    img.src = '/public/google2.0.0.jpg';
    let context = canvas.getContext("2d");
    console.log(context);
    img.onload = () => {
      console.log("asdf");
      context.drawImage(img, 100, 100, 150, 110, 0, 0, 300, 220);
    };
    context.drawImage(img, 100, 100, 150, 110, 0, 0, 300, 220);
    document.body.appendChild(canvas);
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
