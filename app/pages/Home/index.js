/* eslint-disable camelcase */
import Button from 'classes/Button'
import Page from 'classes/Page'
import Prefix from 'prefix'
export default class Home extends Page {
  constructor () {
    super({
      id: 'home',
      element: '.home',
      elements: {
        wrapper: '.home__wrapper',
        navigation: document.querySelector('.navigation'),
        link: '.home__content__button',
        scrolldown: '.scrolldown__button',
        scrolltop: '.scrolltop__button'
      }
    })
    this.transformPrefix = Prefix('transform')
  }

  create () {
    super.create()

    this.link = this.elements.link.forEach((item) => {
      const scrolldown = item.classList.contains('scrolldown__button')
      if (!scrolldown) {
        return new Button({
          element: item
        })
      }
    })
    this.scrolldown = new Button({
      element: this.elements.scrolldown
    })
    this.scrolltop = new Button({
      element: this.elements.scrolltop
    })
  }

  scrollDown () {
    this.y.end = document.querySelector('.home__content--right').offsetTop
    this.scroll.target = this.y.end
    this.elements.wrapper.style[this.transformPrefix] = `translate3d(0px, -${this.y.end}px, 0px)`
  }

  scrollTop () {
    this.y.end = 0
    this.scroll.target = this.y.end
    this.elements.wrapper.style[this.transformPrefix] = `translate3d(0px, -${this.y.end}px, 0px)`
  }

  addEventListeners () {
    this.scrollDownEvent = this.scrollDown.bind(this)
    this.scrollTopEvent = this.scrollTop.bind(this)

    this.elements.scrolldown.addEventListener('click', this.scrollDownEvent)
    this.elements.scrolltop.addEventListener('click', this.scrollTopEvent)
  }

  removeEventListeners () {
    this.elements.scrolldown.removeEventListener('click', this.onClickEvent)
    this.elements.scrolltop.removeEventListener('click', this.scrollTopEvent)
  }
}
