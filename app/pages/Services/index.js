import Button from 'classes/Button'
import Page from 'classes/Page'

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
}
