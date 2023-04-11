export default class {
  constructor ({ gl, scene, sizes }) {
    this.gl = gl
    this.scene = scene
    this.sizes = sizes
    this.wrapper = document.querySelector('.contact__wrapper')
  }

  show () {}

  hide () {}

  // Events

  onResize () {}

  onTouchDown () {}

  onTouchMove () {}

  onTouchUp () {}

  onWheel ({ pixelX, pixelY }) {}

  // Update

  update () {}

  // Destroy

  destroy () {}
}
