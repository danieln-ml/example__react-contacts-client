import React from "react"

export default class LoginUserForm extends React.Component {

  render() {
    const {onLogin, children} = this.props

    return (
      <form onSubmit={onLogin}>
        <h3>Sign In</h3>
        {children}
        <input type="submit" value="Sign In" />
      </form>
    )
  }
}
