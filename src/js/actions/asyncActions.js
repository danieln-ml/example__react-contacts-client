import api from '../services/ContactsApi'
import {toSchema, toForm} from '../helpers'

// helper function to map promise to a dispatch function
const promiseWrapper = (actionType, inputPromise, dataTransform, errTransform) => {

  const STATUS = {
    PENDING:    `${actionType}_PENDING`,
    FULFILLED:  `${actionType}_FULFILLED`,
    REJECTED:   `${actionType}_REJECTED`
  }

  return (dispatch) => {
    dispatch({ type: STATUS.PENDING });

    inputPromise.then(
      res => {
        dispatch({
          type: STATUS.FULFILLED,
          payload: dataTransform ? dataTransform(res) : res
        })
      },
      err => {
        dispatch({
          type: STATUS.REJECTED,
          payload: errTransform ? errTransform(err) : err
        })
      }
    )
  }
}

// takes an input promise that will return the userId
// actionType, inputPromise, dataTransform, errTransform
const contactsPromiseWrapper = (actionType, userPromiseFn, user) => {

  const STATUS = {
    PENDING:    `${actionType}_PENDING`,
    FULFILLED:  `${actionType}_FULFILLED`,
    REJECTED:   `${actionType}_REJECTED`,
    CONTACTS_PENDING: 'FETCH_CONTACTS_PENDING',
    CONTACTS_FULFILLED: 'FETCH_CONTACTS_FULFILLED',
    CONTACTS_REJECTED: 'FETCH_CONTACTS_REJECTED'
  }

  return (dispatch) => {
    dispatch({ type: STATUS.PENDING })
    userPromiseFn(user)
    .then(
      (res) => {

        const userId = res.data._id
        const loggedInUser = {...user, _id: userId};

        dispatch({ type: STATUS.FULFILLED, payload: userId})
        dispatch({ type: STATUS.CONTACTS_PENDING})
        return api.fetchContacts(loggedInUser)
      },
      (err) => {
        dispatch({ type: STATUS.REJECTED, payload: err.message})
        return err
      }
    )
    .then(
      (res) => {
        if (res) {
          dispatch({ type: STATUS.CONTACTS_FULFILLED, payload: res.data.map(toForm) })
        }

      },
      (err) => {
        dispatch({ type: STATUS.CONTACTS_REJECTED, payload: err.message})
      }
    )
  }
}

export const authenticateUser = (user) => {
  const reqUser = {email: user.email, password: user.password}
  return contactsPromiseWrapper('LOGIN_USER', api.authenticateUser, reqUser)
}

export const createUser = (user) => {
  const reqUser = {email: user.email, password: user.password}
  return contactsPromiseWrapper('LOGIN_USER', api.createUser, reqUser)
}

// flatten contacts for easier updates
export const fetchContacts = (user) => {
  return promiseWrapper(
    'FETCH_CONTACTS',
    api.fetchContacts(user),
    (res) => res.data.map(toForm),
    (err) => err.message
  )
}

export const updateContact = (user, contact) => {
  return promiseWrapper(
    'UPDATE_CONTACT',
    api.updateContact(user, contact),
    null,
    (err) => err.message
  )
}

export const deleteContact = (user, contactId) => {
  return promiseWrapper(
    'DELETE_CONTACT',
    api.deleteContact(user, contactId),
    () => contactId,
    (err) => err.message
  )
}

export const createContact = (user, contact) => {
  return promiseWrapper(
    'CREATE_CONTACT',
    api.createContact(user, contact),
    (res) => toForm(res.data),
    (err) => err.message
  )
}
