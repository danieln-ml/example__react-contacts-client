import React from "react";
import Api from "../services/ContactsApi"
import UserSession from "../services/UserSession"
import UserLayout from "./Layouts/UserLayout.jsx"

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {
        password: '',
        email: ''
      },
      currentPage: 'Login'
    }
  }

  loginHandler = (user) => {
    Api.authenticateUser(user).then(
      (response) => {
        let { _id } = response.data
        UserSession.setUser({
          _id: _id,
          email: user.email,
          password: user.password
        })
        this.setState({hasUserSession: true})
      },
      (error) => {
        const { code } = error.response.data
        if (code === 401) {
          alert('User not found')
        }
        else {
          alert(error.response.data.description)
        }
      }
    )
  }

  createHandler = (user) => {
    Api.createUser(user).then(
      (response) => {
        let { _id } = response.data
        UserSession.setUser({
          _id: _id,
          email: user.email,
          password: user.password
        })
        this.setState({ hasUserSession: true })
      },
      (error) => {
        console.error(error.response.data)
      }
    )
  }

  createLinkHandler = () => {
    console.log('asdflj')
    this.setState({currentPage: 'Create'})
  }

  loginLinkHandler = () => {
    this.setState({currentPage: 'Login'})
  }

  render() {
    return (
      <div>
        <header>
          {this.renderHeaderButton()}
        </header>
        {this.renderBody()}
      </div>
    )
  }

  renderBody() {
    return (
      <UserLayout
        loginHandler={this.loginHandler}
        createHandler={this.createHandler}
        currentPage={this.state.currentPage} />
    );
  }
  renderHeaderButton() {
    let buttonAction, buttonText

      if (this.state.currentPage === 'Create') {
        buttonAction = this.loginLinkHandler
        buttonText = "Sign In"

      }
      else {
        buttonAction = this.createLinkHandler
        buttonText = "Sign Up"
      }

    return (
      <button onClick={buttonAction} className="btn btn-warning btn-sm">{buttonText}</button>
    )
  }
}
