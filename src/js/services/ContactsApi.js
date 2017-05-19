import axios from "axios"
import UserSession from "./UserSession"

axios.defaults.baseURL = 'http://127.0.0.1:9900'
axios.defaults.headers.post['Content-Type'] = 'application/json'

const getAuthObject = u => ({ username: u.email, password: u.password })

const toSchema = (contact) => {
  var body = {
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phoneNumbers: {
      mobile: contact.phoneMobile,
      work: contact.phoneWork,
      home: contact.phoneHome
    }
  };
  if (contact._id) {
    body._id = contact._id;
  }
  return body;
}

const Api =  {
  createUser: (user) => {
    return axios({
      method: 'post',
      url: '/users',
      data: user
    });
  },
  authenticateUser: (user) => {
    return axios({
      method: 'get',
      url: '/me',
      auth: getAuthObject(user)
    });
  },
  fetchContacts: () => {
    const user = UserSession.getUser();
    return axios({
      method: 'get',
      url: `/users/${user._id}/contacts`,
      auth: getAuthObject(user)
    });
  },
  createContact: (contact) => {
    const user = UserSession.getUser();
    return axios({
      method: 'post',
      url: `/users/${user._id}/contacts`,
      auth: getAuthObject(user),
      data: toSchema(contact)
    });
  },
};

export { Api as default }
