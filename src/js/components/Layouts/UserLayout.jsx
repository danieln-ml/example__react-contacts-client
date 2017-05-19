import React from "react"
import CreateUserForm from "../Users/CreateUserForm.jsx"
import LoginUserForm from "../Users/LoginUserForm.jsx"

export default class UserLayout extends React.Component {

  state = {
    user: {
      email: '',
      password: ''
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target
    const { user } = this.state
    user[name] = value
    this.setState({ user: user })
  }

  handleSubmit(fn) {
    return (e) => {
      fn(this.state.user)
      e.preventDefault()
    }
  }

  render() {
    const {user} = this.state
    const {currentPage, createHandler, loginHandler} = this.props
    const userInputs = this.renderUserInputs()
    return (
      currentPage === 'Create' ?
        <CreateUserForm onCreate={this.handleSubmit(createHandler)}>
          {userInputs}
        </CreateUserForm> :
        <LoginUserForm onLogin={this.handleSubmit(loginHandler)}>
          {userInputs}
        </LoginUserForm>
    )
  }
  renderUserInputs() {
    const {email, password} = this.state.user
      return [
        <input
          key="Email"
          label="Email"
          type="email"
          onChange={this.handleInputChange}
          value={email}
          name="email"
          placeholder="admin@carbon.io" />,
        <input
          key="Password"
          label="Password"
          type="password"
          onChange={this.handleInputChange}
          value={password}
          name="password"
          placeholder="Password" />
      ]
  }
}
