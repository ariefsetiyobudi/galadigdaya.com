import GSAP from 'gsap'

import Component from 'classes/Component'

import { COLOR_WHITE, COLOR_BLACK } from 'utils/color'

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
        mobileItem: '.navigation__mobile__list__item'
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
  }

  onClick () {
    this.element.classList.toggle('open')
    this.elements.mobileButton.classList.toggle('open')
    this.elements.mobileMenu.classList.toggle('open')
  }

  addEventListeners () {
    this.menuEvent = this.onClick.bind(this)

    this.elements.mobileButton.addEventListener('click', this.menuEvent)
    this.elements.mobileItem.forEach((item) => {
      item.addEventListener('click', this.menuEvent)
    })
  }

  removeEventListeners () {
    this.elements.mobileButton.removeEventListener('click', this.menuEvent)
    this.elements.mobileItem.forEach((item) => {
      item.removeEventListener('click', this.menuEvent)
    })
  }
}
