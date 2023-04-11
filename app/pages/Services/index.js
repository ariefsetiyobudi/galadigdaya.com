import Button from 'classes/Button'
import Page from 'classes/Page'
import Prefix from 'prefix'

export default class Services extends Page {
  constructor () {
    super({
      id: 'services',
      element: '.services',
      elements: {
        wrapper: '.services__wrapper',
        navigation: document.querySelector('.navigation'),
        link: '.services__content__button',
        scrolltop: '.scrolltop__button'
      }
    })
    this.transformPrefix = Prefix('transform')
  }

  create () {
    super.create()

    this.link = new Button({
      element: this.elements.link
    })

    this.scrolltop = new Button({
      element: this.elements.scrolltop
    })
  }

  scrollTop () {
    this.y.end = 0
    this.scroll.target = this.y.end
    this.elements.wrapper.style[this.transformPrefix] = `translate3d(0px, -${this.y.end}px, 0px)`
  }

  addEventListeners () {
    this.scrollTopEvent = this.scrollTop.bind(this)

    this.elements.scrolltop.addEventListener('click', this.scrollTopEvent)
  }

  removeEventListeners () {
    this.elements.scrolltop.removeEventListener('click', this.scrollTopEvent)
  }
}
