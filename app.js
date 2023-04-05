/* eslint-disable no-unused-vars */
require('dotenv').config()

const fetch = require('node-fetch')
const logger = require('morgan')
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000

const Prismic = require('@prismicio/client')
const PrismicH = require('@prismicio/helpers')
const UAParser = require('ua-parser-js')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(errorHandler())
app.use(methodOverride())
app.use(express.static(path.join(__dirname, 'public')))

// Initialize the prismic.io api
const initApi = (req) => {
  return Prismic.createClient(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req,
    fetch
  })
}

// Link Resolver
const HandleLinkResolver = (doc) => {
  if (doc.type === 'company') {
    return '/company'
  }
  if (doc.type === 'services') {
    return '/services'
  }
  if (doc.type === 'contact') {
    return '/contact'
  }

  // Default to homepage
  return '/'
}

// Middleware to inject prismic context
app.use((req, res, next) => {
  const ua = UAParser(req.headers['user-agent'])

  res.locals.isDesktop = ua.device.type === undefined
  res.locals.isPhone = ua.device.type === 'mobile'
  res.locals.isTablet = ua.device.type === 'tablet'

  res.locals.Link = HandleLinkResolver
  res.locals.PrismicH = PrismicH
  res.locals.Numbers = (index) => {
    return index === 0 ? 'One' : index === 1 ? 'Two' : index === 2 ? 'Three' : index === 3 ? 'Four' : ''
  }

  next()
})

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.locals.basedir = app.get('views')

const handleRequest = async (api) => {
  const [meta, preloader, navigation, footer, home, company, services, contact] =
    await Promise.all([
      api.getSingle('meta'),
      api.getSingle('preloader'),
      api.getSingle('navigation'),
      api.getSingle('footer'),
      api.getSingle('home'),
      api.getSingle('company'),
      api.getSingle('services'),
      api.getSingle('contact')
    ])

  const assets = []

  console.log(contact.data)

  assets.push(home.data.body[0].primary.image.url)
  assets.push(home.data.body[1].primary.image.url)
  assets.push(home.data.body[2].primary.image.url)
  home.data.body[3].items.forEach((item) => {
    assets.push(item.image.url)
  })
  assets.push(home.data.body[4].primary.image.url)
  assets.push(home.data.body[5].primary.image.url)
  home.data.body[7].items.forEach((item) => {
    assets.push(item.image.url)
  })

  return {
    assets,
    meta,
    preloader,
    navigation,
    footer,
    home,
    company,
    services,
    contact
  }
}

app.get('/', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  res.render('pages/home', {
    ...defaults
  })
})

app.get('/company', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  res.render('pages/company', {
    ...defaults
  })
})

app.get('/services', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  res.render('pages/services', {
    ...defaults
  })
})

app.get('/contact', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  res.render('pages/contact', {
    ...defaults
  })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
