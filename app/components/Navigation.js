/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import GSAP from 'gsap'
import Component from 'classes/Component'
import { COLOR_WHITE, COLOR_BLACK, COLOR_COOL_BLACK, COLOR_CULTURED } from 'utils/color'

export default class Navigation extends Component {
  constructor ({ template }) {
    super({
      element: '.navigation',
      elements: {
        items: '.navigation__list__item',
        links: '.navigation__list__link',
        mobileButton: '.navigation__mobile__button',
        mobileButtonLines: '.navigation__mobile__menu',
        mobileMenu: '.navigation__mobile',
        mobileItem: '.navigation__mobile__list__item',
        switchButton: 'input[type=checkbox]'
      }
    })

    this.onChange(template)
  }

  onChange (template) {
    GSAP.to(this.elements.items[0], {
      autoAlpha: 0
    })

    GSAP.to(this.elements.items[1], {
      autoAlpha: 1
    })
    if (template === 'home') {
      GSAP.to(this.elements.mobileButtonLines, {
        background: COLOR_WHITE
      })

      GSAP.to(this.elements.mobileMenu, {
        color: COLOR_WHITE
      })

      GSAP.to(this.element, {
        color: COLOR_WHITE
      })
    } else {
      GSAP.to(this.elements.mobileButtonLines, {
        background: COLOR_BLACK
      })

      GSAP.to(this.elements.mobileMenu, {
        color: COLOR_WHITE
      })

      GSAP.to(this.element, {
        color: COLOR_BLACK
      })
    }

    this.template = template

    this.switchEvents()

    // if (this.template === 'home') {
    //   const home_cbg = document.querySelectorAll('.home__content--background')
    //   const home_gl = document.querySelectorAll('.home__gallery')
    //   console.log(home_cbg)
    //   console.log(home_gl)
    // }
    // if (this.template === 'services') {
    //   const services_gl = document.querySelectorAll('.services__gallery')
    //   console.log(services_gl)
    // }
  }

  lightMode () {
    GSAP.to(document.querySelector('.navigation__mobile'), {
      background: COLOR_COOL_BLACK,
      color: COLOR_WHITE
    })
    GSAP.to(document.querySelector('#content'), {
      background: COLOR_CULTURED,
      color: COLOR_BLACK
    })
    if (this.template === 'home') {
      GSAP.to(this.elements.mobileButtonLines, {
        background: COLOR_WHITE
      })

      GSAP.to(this.elements.mobileMenu, {
        color: COLOR_WHITE
      })

      GSAP.to(this.element, {
        color: COLOR_WHITE
      })
    } else {
      GSAP.to(this.elements.mobileButtonLines, {
        background: COLOR_BLACK
      })

      GSAP.to(this.elements.mobileMenu, {
        color: COLOR_WHITE
      })

      GSAP.to(this.element, {
        color: COLOR_BLACK
      })
    }
  }

  darkMode () {
    GSAP.to(document.querySelector('.navigation__mobile'), {
      background: COLOR_BLACK,
      color: COLOR_WHITE
    })
    GSAP.to(document.querySelector('#content'), {
      background: COLOR_BLACK,
      color: COLOR_WHITE
    })
    if (this.template === 'home') {
      GSAP.to(this.elements.mobileButtonLines, {
        background: COLOR_WHITE
      })

      GSAP.to(this.elements.mobileMenu, {
        color: COLOR_WHITE
      })

      GSAP.to(this.element, {
        color: COLOR_WHITE
      })
    } else {
      GSAP.to(this.elements.mobileButtonLines, {
        background: COLOR_WHITE
      })

      GSAP.to(this.elements.mobileMenu, {
        color: COLOR_BLACK
      })

      GSAP.to(this.element, {
        color: COLOR_WHITE
      })
    }
  }

  switchEvents () {
    if (this.elements.switchButton.checked) {
      document.querySelector('#content').setAttribute('mode', 'dark')
      document.querySelector('.mode label').innerText = 'Dark'
      this.darkMode()
    } else {
      document.querySelector('#content').setAttribute('mode', 'light')
      document.querySelector('.mode label').innerText = 'Light'
      this.lightMode()
    }
  }

  menuEvents () {
    this.element.classList.toggle('open')
    this.elements.mobileButton.classList.toggle('open')
    this.elements.mobileMenu.classList.toggle('open')
  }

  addEventListeners () {
    this.menuEvent = this.menuEvents.bind(this)
    this.switchEvent = this.switchEvents.bind(this)

    this.elements.mobileButton.addEventListener('click', this.menuEvent)
    this.elements.mobileItem.forEach((item) => {
      item.addEventListener('click', this.menuEvent)
    })
    this.elements.switchButton.addEventListener('change', this.switchEvent)
  }

  removeEventListeners () {
    this.elements.mobileButton.removeEventListener('click', this.menuEvent)
    this.elements.mobileItem.forEach((item) => {
      item.removeEventListener('click', this.menuEvent)
    })
    this.elements.switchButton.removeEventListener('change', this.switchEvent)
  }
}
