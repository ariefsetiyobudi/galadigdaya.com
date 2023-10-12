import GSAP from 'gsap'
import Animation from '../classes/Animation'
import { COLOR_WHITE } from 'utils/color'

export default class Section extends Animation {
  constructor ({ element }) {
    super({
      element
    })
    this.navColor = element.getAttribute('nav-color')
    this.navigation = document.querySelector('.navigation')
    this.mobileButton = document.querySelectorAll('.navigation__mobile__menu')
  }

  animateIn () {
    const darkMode = document.querySelector('#content').getAttribute('mode')

    if (darkMode === 'light') {
      GSAP.to(this.navigation, {
        color: this.navColor
      })
      this.mobileButton.forEach((item) => {
        GSAP.to(item, {
          backgroundColor: this.navColor
        })
      })
    } else if (darkMode === 'dark') {
      GSAP.to(this.navigation, {
        color: COLOR_WHITE
      })
      this.mobileButton.forEach((item) => {
        GSAP.to(item, {
          backgroundColor: COLOR_WHITE
        })
      })
    }
  }

  animateOut () {}
}
