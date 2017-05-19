import React from "react";
import Api from "../services/ContactsApi"
import UserSession from "../services/UserSession"
import UserLayout from "./Layouts/UserLayout.jsx"
import ContactsLayout from "./Layouts/ContactsLayout.jsx"

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      hasUserSession: !!UserSession.getUser(),
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
        this.setState({hasUserSession: !!UserSession.getUser()})
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
        this.setState({ hasUserSession: !!UserSession.getUser() })
      },
      (error) => {
        console.error(error.response.data)
      }
    )
  }

  createLinkHandler = () => {
    this.setState({currentPage: 'Create'})
  }

  loginLinkHandler = () => {
    this.setState({currentPage: 'Login'})
  }

  logoutLinkHandler = () => {
    UserSession.removeUser()
    this.setState({ hasUserSession: !!UserSession.getUser() })
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
    if (this.state.hasUserSession) {
      return <ContactsLayout />

    } else {
      return (
        <UserLayout
          loginHandler={this.loginHandler}
          createHandler={this.createHandler}
          currentPage={this.state.currentPage} />
      )
    }
  }
  renderHeaderButton() {
    let buttonAction, buttonText

    if (this.state.hasUserSession) {
      buttonAction = this.logoutLinkHandler
      buttonText = "Log Out"

    } else {
      if (this.state.currentPage === 'Create') {
        buttonAction = this.loginLinkHandler
        buttonText = "Sign In"

      } else {
        buttonAction = this.createLinkHandler
        buttonText = "Sign Up"
      }
    }

    return (
      <button onClick={buttonAction} className="btn btn-warning btn-sm">{buttonText}</button>
    )
  }
}
