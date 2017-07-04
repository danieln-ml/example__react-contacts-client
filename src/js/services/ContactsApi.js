import axios from 'axios'
import {toSchema} from '../helpers'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = 'http://localhost:9900'

const getAuthObject = u => ({ username: u.email, password: u.password })

const Api = {
  createUser: (user) => {
    return axios({
      method: 'post',
      url: '/users',
      data: user
    })
  },

  authenticateUser: (user) => {
    return axios({
      method: 'get',
      url: '/me',
      auth: getAuthObject(user)
    })
  },

  fetchContacts: (user) => {
    return axios({
      method: 'get',
      url: `/users/${user._id}/contacts`,
      auth: getAuthObject(user)
    })
  },

  createContact: (user, contact) => {
    return axios({
      method: 'post',
      url: `/users/${user._id}/contacts`,
      auth: getAuthObject(user),
      data: toSchema(contact)
    })
  },

  deleteContact: (user, contactId) => {
    return axios({
      method: 'delete',
      url: `/users/${user._id}/contacts/${contactId}`,
      auth: getAuthObject(user)
    })
  },

  updateContact: (user, contact) => {
    return axios({
      method: 'put',
      url: `/users/${user._id}/contacts/${contact._id}`,
      auth: getAuthObject(user),
      data: toSchema(contact)
    })
  }
}

export { Api as default }
