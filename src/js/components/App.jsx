import React from "react"

import ContactLayout from "./Layouts/ContactLayout.jsx"
import UserStorage from "../services/UserSession.js"
import Api from "../services/ContactsApi"
import HeaderContainer from '../containers/HeaderContainer'
import LoginUserContainer from '../containers/LoginUserContainer'
import SignupUserContainer from '../containers/SignupUserContainer'

export default class App extends React.Component {

  render() {
    return (
      <div>
        <HeaderContainer />

        {this.props.error &&
        <div className="alert alert-danger alert-box">
          {this.props.error}
        </div>}

        <div className="container content">
          {this.renderBody()}
        </div>
      </div>
    )
  }

  renderBody() {
    switch (this.props.view) {
      case 'LOGIN':
        return <LoginUserContainer />
      case 'SIGNUP':
        return <SignupUserContainer />
      case 'CONTACTS':
        return <ContactLayout />
      default:
        return <LoginUserContainer />
    }
  }
}
