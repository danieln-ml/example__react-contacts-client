import React from "react"
import { render } from "react-dom"
import AppContainer from './components/App'

// now its for the redux
import { Provider } from "react-redux"
import store from './stores'

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
)
