import Page from 'classes/Page'

export default class Company extends Page {
  constructor () {
    super({
      id: 'company',
      element: '.company',
      elements: {
        wrapper: '.company__wrapper',
        navigation: document.querySelector('.navigation')
      }
    })
  }
}
