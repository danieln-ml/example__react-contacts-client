import React from "react"
import CreateUserForm from "../Users/CreateUserForm.jsx"
import LoginUserForm from "../Users/LoginUserForm.jsx"
import Input from "../Input"

export default class UserLayout extends React.Component {

  state = {
    user: {
      email: '',
      password: ''
    }
  }

  handleChange = (name, value) => {
     let user = Object.assign({}, this.state.user)
     user[name] = value
     this.setState({ user: user })
   }

  render() {
    const {user} = this.state
    const {currentPage, createHandler, loginHandler} = this.props
    const userInputs = this.renderUserInputs()
    return (
      currentPage === 'Create' ?
        <CreateUserForm onCreate={() => createHandler(user)}>
          {userInputs}
        </CreateUserForm> :
        <LoginUserForm onLogin={() => loginHandler(user)}>
          {userInputs}
        </LoginUserForm>
    )
  }
  renderUserInputs() {
    const {email, password} = this.state.user
      return [
        <Input
          key="Email"
          label="Email"
          type="email"
          handleChange={this.handleChange}
          value={email}
          name="email"
          placeholder="admin@carbon.io" />,
        <Input
          key="Password"
          label="Password"
          type="password"
          handleChange={this.handleChange}
          value={password}
          name="password"
          placeholder="Password" />
      ]
  }
}
