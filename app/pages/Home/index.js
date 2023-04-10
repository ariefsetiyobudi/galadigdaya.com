import Button from 'classes/Button'
import Page from 'classes/Page'
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
  }

  create () {
    super.create()

    this.link = this.elements.link.forEach((item) => {
      return new Button({
        element: item
      })
    })
    this.scrolltop = new Button({
      element: this.elements.scrolltop
    })
  }
}
