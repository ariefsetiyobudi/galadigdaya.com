/* eslint-disable no-unused-vars */
// import GSAP from 'gsap'
import { Camera, Renderer, Transform } from 'ogl'

import Home from './Home'
import Company from './Company'
import Services from './Services'
import Contact from './Contact'

export default class Canvas {
  constructor ({ template }) {
    this.template = template

    this.x = {
      start: 0,
      distance: 0,
      end: 0
    }

    this.y = {
      start: 0,
      distance: 0,
      end: 0
    }

    this.scroll = {
      ease: 0.05,
      current: 0,
      target: 0,
      last: 0
    }

    this.createRenderer()
    this.createCamera()
    this.createScene()
    this.onResize()
  }

  createRenderer () {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true
    })

    this.gl = this.renderer.gl

    document.body.appendChild(this.gl.canvas)
  }

  createCamera () {
    this.camera = new Camera(this.gl)
    this.camera.position.z = 10
  }

  createScene () {
    this.scene = new Transform()
  }

  //   Home
  createHome () {
    this.home = new Home({
      gl: this.gl,
      scene: this.scene,
      sizes: this.sizes
    })
  }

  destroyHome () {
    if (!this.home) return

    this.home.destroy()
    this.home = null
  }

  //   company
  createCompany () {
    this.company = new Company({
      gl: this.gl,
      scene: this.scene,
      sizes: this.sizes
    })
  }

  destroyCompany () {
    if (!this.company) return

    this.company.destroy()
    this.company = null
  }

  //   services
  createServices () {
    this.services = new Services({
      gl: this.gl,
      scene: this.scene,
      sizes: this.sizes
    })
  }

  destroyServices () {
    if (!this.services) return

    this.services.destroy()
    this.services = null
  }

  //   contact

  createContact () {
    this.contact = new Contact({
      gl: this.gl,
      scene: this.scene,
      sizes: this.sizes
    })
  }

  destroyContact () {
    if (!this.contact) return

    this.contact.destroy()
    this.contact = null
  }

  // Events
  onPreloaded () {
    this.onChangeEnd(this.template)
  }

  onChangeStart (template, url) {
    if (this.home) {
      this.home.hide()
    }

    if (this.services) {
      this.services.hide()
    }

    if (this.contact) {
      this.contact.hide()
    }

    if (this.company) {
      this.company.hide()
    }
  }

  onChangeEnd (template) {
    if (template === 'home') {
      this.createHome()
    } else {
      this.destroyHome()
    }

    if (template === 'company') {
      this.createCompany()
    } else if (this.company) {
      this.destroyCompany()
    }

    if (template === 'contact') {
      this.createContact()
    } else if (this.contact) {
      this.destroyContact()
    }

    if (template === 'services') {
      this.createServices()
    } else if (this.services) {
      this.destroyServices()
    }

    this.template = template
  }

  onResize () {
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.camera.perspective({
      aspect: window.innerWidth / window.innerHeight
    })

    const fov = this.camera.fov * (Math.PI / 180)
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect

    this.sizes = {
      height,
      width
    }

    const values = {
      sizes: this.sizes
    }

    if (this.home) {
      this.home.onResize(values)
    }

    if (this.company) {
      this.company.onResize(values)
    }

    if (this.services) {
      this.services.onResize(values)
    }

    if (this.contact) {
      this.contact.onResize(values)
    }
  }

  onTouchDown (e) {
    this.isDown = true

    this.x.start = e.touches ? e.touches[0].clientX : e.clientX
    this.y.start = e.touches ? e.touches[0].clientY : e.clientY

    const values = {
      x: this.x,
      y: this.y
    }

    if (this.home) {
      this.home.onTouchDown(values)
    }

    if (this.company) {
      this.company.onTouchDown(values)
    }

    if (this.services) {
      this.services.onTouchDown(values)
    }

    if (this.contact) {
      this.contact.onTouchDown(values)
    }
  }

  onTouchMove (e) {
    if (!this.isDown) return

    const x = e.touches ? e.touches[0].clientX : e.clientX
    const y = e.touches ? e.touches[0].clientY : e.clientY

    this.x.end = x
    this.y.end = y

    const values = {
      x: this.x,
      y: this.y
    }

    if (this.home) {
      this.home.onTouchMove(values)
    }

    if (this.company) {
      this.company.onTouchMove(values)
    }

    if (this.services) {
      this.services.onTouchMove(values)
    }

    if (this.contact) {
      this.contact.onTouchMove(values)
    }
  }

  onTouchUp (e) {
    this.isDown = false

    const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
    const y = e.changedTouches ? e.changedTouches[0].clientY : e.clientY

    this.x.end = x
    this.y.end = y

    const values = {
      x: this.x,
      y: this.y
    }

    if (this.isDown && this.home) {
      this.home.onTouchUp(values)
    }

    if (this.isDown && this.company) {
      this.company.onTouchUp(values)
    }

    if (this.isDown && this.services) {
      this.services.onTouchUp(values)
    }

    if (this.isDown && this.contact) {
      this.contact.onTouchUp(values)
    }
  }

  onWheel (e) {
    if (this.home) {
      this.home.onWheel(e)
    }

    if (this.company) {
      this.company.onWheel(e)
    }

    if (this.services) {
      this.services.onWheel(e)
    }

    if (this.contact) {
      this.contact.onWheel(e)
    }
  }

  // Loop.

  update (scroll) {
    if (this.home) {
      this.home.update(scroll)
    }

    if (this.company) {
      this.company.update(scroll)
    }

    if (this.services) {
      this.services.update(scroll)
    }

    if (this.contact) {
      this.contact.update(scroll)
    }

    this.renderer.render({
      camera: this.camera,
      scene: this.scene
    })
  }
}
