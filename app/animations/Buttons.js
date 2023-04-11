import GSAP from 'gsap'
import Animation from '../classes/Animation'

export default class Buttons extends Animation {
  constructor ({ element, elements }) {
    super({
      element,
      elements
    })
  }

  animateIn () {
    GSAP.fromTo(this.element, {
      autoAlpha: 0,
      y: '150%'
    }, {
      autoAlpha: 1,
      delay: 2,
      duration: 1.5,
      ease: 'expo.out',
      y: '0%'
    })
  }

  animateOut () {
    GSAP.set(this.element, {
      autoAlpha: 0
    })
  }
}
