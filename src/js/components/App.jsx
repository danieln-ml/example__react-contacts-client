import React from "react";

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {
        password: '',
        email: ''
      }
    }
  }

  createUser(user) {
    console.log('creating ->', user)
  }

  render() {

    const { user } = this.state

    const handleChange = (e) => {
      const { name, value } = e.target
      user[name] = value
      this.setState({ user: user })
      console.log(this.state.user)
    }

    const handleSubmit = (e) => {
      this.createUser(user)
      e.preventDefault()
    }

    return (
      <form onSubmit={handleSubmit}>
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
