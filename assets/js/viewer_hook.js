// skip Chrome check
goog.labs.userAgent.browser.isChrome = () => true;
const realTHREE_WebGLRenderer = THREE.WebGLRenderer;
// enable WebXR
THREE.WebGLRenderer = function (arg1) {
  realTHREE_WebGLRenderer.call(this, arg1);
  this.xr.enabled = true;
  this.xr.setReferenceSpaceType("local");
  document.body.appendChild(VRButton.createButton(this));
  this.xr.addEventListener("sessionstart", () => {
    document.getElementsByTagName("video")[0].play();
  });
  return this;
};
// EffectComposer not supported on WebXR
THREE.EffectComposer.prototype.render = function (deltaTime) {
  this.renderer.render(this.passes[0].scene, this.passes[0].camera);
};
// shut up log spam:
// "THREE.WebGLRenderer: Can't change size while VR device is presenting."
const realTHREE_WebGLRenderer_setSize = THREE.WebGLRenderer.prototype.setSize;
THREE.WebGLRenderer.prototype.setSize = function (a, b, c) {
  if (this.xr.isPresenting) return;
  return realTHREE_WebGLRenderer_setSize.call(this, a, b, c);
};

// commented out the call in the original viewer.js; call it here after we patched everything
module$contents$vr$lightfield$web_viewer$github$viewer_start();
