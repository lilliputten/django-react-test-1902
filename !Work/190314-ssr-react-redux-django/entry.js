import React from 'react'
import ReactDOM from 'react-dom'
import { match } from 'react-router'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'

import configureStore from './bodega/store/store'
import Root from './bodega/components/root'
import getRoutes from './bodega/components/routes'

import './styles/main.scss'

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp)
} else {
  initializeApp()
}

function initializeApp () {
  const store = configureStore(window.__REDUX_STATE__)

  const { pathname, search, hash } = window.location
  const location = `${pathname}${search}${hash}`
  const routes = getRoutes(store)

  match({ routes, location }, () => {
    ReactDOM.render(
      <Provider store={store}>
        <Router history={browserHistory}>
          {routes}
        </Router>
      </Provider>,
      document.getElementById('root')
    )
  })
}
