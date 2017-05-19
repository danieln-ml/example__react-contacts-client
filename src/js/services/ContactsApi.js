import axios from "axios"

axios.defaults.baseURL = 'http://127.0.0.1:9900'
axios.defaults.headers.post['Content-Type'] = 'application/json'

const getAuthObject = u => ({ username: u.email, password: u.password })

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
  }
};

export { Api as default }
