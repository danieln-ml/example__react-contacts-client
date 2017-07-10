import React from "react"
import { connect } from 'react-redux'
import { switchView } from '../../actions'

export class Header extends React.Component {
  render() {
    const { text, nextView, dispatch } = this.props
    const linkClickHandler = (e) => {
      dispatch(switchView(nextView))
      e.preventDefault()
    }
    return (
      <header className="header">
        <div className="container header--content">
          <h2 className="header--title">Contact List</h2>
          <div className="header--links">
            <a className="btn btn-warning btn-sm" onClick={linkClickHandler}> {text} </a>
          </div>
        </div>
      </header>
    )
  }
}

const getButtonText = (view) => {
  switch(view) {
    case 'SIGNUP':
      return {
        nextView: 'LOGIN',
        text: 'Log In'
      };
    case 'CONTACTS':
      return {
        nextView: 'LOGIN',
        text: 'Logout'
      };
    default:
      // make login the default view
      return {
        nextView: 'SIGNUP',
        text: 'Sign up'
      };
  }
}

const mapStateToProps = state => {
  return getButtonText(state.view)
}

const HeaderContainer = connect(
  mapStateToProps
)(Header)

export default HeaderContainer
