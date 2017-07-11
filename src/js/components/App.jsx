import React from 'react'
import { connect } from 'react-redux'

import ContactLayout from './Contacts'
import HeaderContainer from './Base/Header'
import LoginUserContainer from './Users/LoginUserContainer'
import SignupUserContainer from './Users/SignupUserContainer'

export class App extends React.Component {

  render() {
    return (
      <div>
        <HeaderContainer />

        { this.props.error &&
          <div className="alert alert-danger alert-box"> {this.props.error} </div> }

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

const mapStateToProps = state => {
  return {
    view: state.view,
    error: state.error
  };
}

const AppContainer = connect(
  mapStateToProps
)(App)

export default AppContainer
