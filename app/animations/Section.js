import GSAP from 'gsap'
import Animation from '../classes/Animation'

export default class Section extends Animation {
  constructor ({ element }) {
    super({
      element
    })
    this.navColor = element.getAttribute('nav-color')
    this.logo = document.querySelector('.navigation__link')
    this.list = document.querySelector('.navigation__list')
    this.mobileButton = document.querySelectorAll('.navigation__mobile__menu')
  }

  animateIn () {
    GSAP.to(this.logo, {
      color: this.navColor
    })
    GSAP.to(this.list, {
      color: this.navColor
    })
    this.mobileButton.forEach((item) => {
      GSAP.to(item, {
        backgroundColor: this.navColor
      })
    })
  }

  animateOut () {}
}
