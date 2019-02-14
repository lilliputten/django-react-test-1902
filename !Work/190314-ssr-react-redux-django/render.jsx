// render.jsx

import React from 'react'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'
import ReactDOMServer from 'react-dom/server'
import configureStore from '../bodega/src/scripts/store/store'
import getRoutes from '../bodega/src/scripts/components/routes'

export default function render (url, initialState) {
  const store = configureStore(initialState)

  const routes = getRoutes(store)

  let html, redirect
  match({ routes, location: url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      redirect = redirectLocation.pathname
    } else if (renderProps) {
      // Here's where the actual rendering happens
      html = ReactDOMServer.renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      )
    }
  })

  if (redirect) return render(redirect, initialState) // Fun recursion

  const finalState = store.getState()

  return {
    html,
    finalState
  }
}
