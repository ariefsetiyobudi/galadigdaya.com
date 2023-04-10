import Button from 'classes/Button'
import Page from 'classes/Page'

export default class Company extends Page {
  constructor () {
    super({
      id: 'company',
      element: '.company',
      elements: {
        wrapper: '.company__wrapper',
        navigation: document.querySelector('.navigation'),
        scrolltop: '.scrolltop__button'
      }
    })
  }

  create () {
    super.create()

    this.scrolltop = new Button({
      element: this.elements.scrolltop
    })
  }
}
