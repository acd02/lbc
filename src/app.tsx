/* eslint import/first: 0 */
if (process.env.ISPROD) require('./polyfill')

import './styles/reset.css'

import * as React from 'react'
import { render } from 'react-dom'
import { Router } from '@reach/router'

import { Routes } from 'routes'

import { Main } from 'commons/layouts'
import { Home } from 'views/home'
import { NotFound } from 'views/notFound'

import { MessagesProvider } from 'views/home/store'

const App = (
  <MessagesProvider>
    <Main>
      {/* setting primary to false to avoid unwanted scroll when switching views */}
      <Router className="router" primary={false}>
        <Home path={Routes.index} />
        <NotFound path={Routes.notFound} />
      </Router>
    </Main>
  </MessagesProvider>
)

render(App, document.querySelector('#app'))

// hmr: only refresh the page if necessary
if (module.hot) module.hot.accept()
