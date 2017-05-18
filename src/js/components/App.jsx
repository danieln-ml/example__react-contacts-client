import React from "react";
import ContactsApi from "../services/ContactsApi"

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {
        password: '',
        email: ''
      },
      userCreated: null
    }
  }

  createUser(user) {
    ContactsApi.createUser(user).then(
    (resp) => {
      const createdUser = Object.assign({}, resp.data, user)
      this.setState({
        userCreated: JSON.stringify(createdUser)
      })
    },
    (err) => {
      alert(err)
    })
  }

  render() {

    const { user, userCreated } = this.state

    const handleChange = (e) => {
      const { name, value } = e.target
      user[name] = value
      this.setState({ user: user })
    }

    const handleSubmit = (e) => {
      this.createUser(user)
      e.preventDefault()
    }

    return (
      <form onSubmit={handleSubmit}>
        { userCreated }
        <h3>Create User</h3>
        <div class="form-group">
          <label>email</label>
          <input name= "email" type="text" onChange={handleChange}/>
        </div>
        <div class="form-group">
          <label>password</label>
          <input name= "password" type="text" onChange={handleChange}/>
        </div>
        <button type="submit">Create</button>
      </form>
    )
  }
}
