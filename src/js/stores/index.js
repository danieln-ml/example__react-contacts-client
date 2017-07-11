
import { createStore, applyMiddleware } from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'

import reducers from '../reducers'
import { fetchContacts } from '../actions'
import { emptyContact, emptyUser } from '../helpers'

import UserSession from '../services/UserSession'


const sessionUser = UserSession.getUser()

const defaultState = {
  view: sessionUser ? 'CONTACTS' : 'LOGIN',
  user: sessionUser || emptyUser(),
  contact: emptyContact(),
  contacts: []
}

const middleware = applyMiddleware(createLogger(), thunk)
const store = createStore(reducers, defaultState, middleware)

store.subscribe( () => {
  const { user } = store.getState()
  if (user._id) {
    UserSession.setUser(user)
  }
  else {
    UserSession.removeUser()
  }
})
let state = store.getState()
const user = state.user

if (user._id) {
  store.dispatch(fetchContacts(user))
}

export default store
