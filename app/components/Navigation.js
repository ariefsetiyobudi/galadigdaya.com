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
        mobile__button: '.navigation__mobile__menu',
        mobile__menu: '.navigation__mobile'
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
      GSAP.to(this.elements.mobile__button, {
        background: COLOR_WHITE
      })

      GSAP.to(this.elements.mobile__menu, {
        color: COLOR_WHITE
      })

      GSAP.to(this.element, {
        color: COLOR_WHITE
      })
    } else {
      GSAP.to(this.elements.mobile__button, {
        background: COLOR_BLACK
      })

      GSAP.to(this.elements.mobile__menu, {
        color: COLOR_WHITE
      })

      GSAP.to(this.element, {
        color: COLOR_BLACK
      })
    }
  }
}
