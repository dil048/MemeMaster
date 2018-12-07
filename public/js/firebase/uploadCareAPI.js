window.UPLOADCARE_PUBLIC_KEY = "acf2010e6106f7bff218";
window.UPLOADCARE_EFFECTS = "crop,grayscale";
window.UPLOADCARE_TABS = "file url gdrive dropbox";
uploadcare.registerTab("preview", uploadcareTabEffects);
const widget = uploadcare.Widget("[role=uploadcare-uploader]");

widget.onUploadComplete(function(info) {
  memeCreator.render({ imgSrc: info.cdnUrl });
  let uploadLink = document.getElementsByClassName(
    "uploadcare--link uploadcare--widget__file-name"
  )[0];
  uploadLink.innerHTML = "Click here to edit or change background";
  let fileSize = document.getElementsByClassName(
    "uploadcare--widget__file-size"
  )[0];
  fileSize.remove();
});
