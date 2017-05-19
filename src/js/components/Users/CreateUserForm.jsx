import React from "react"

export default class CreateUserForm extends React.Component {

  render() {
    const {onCreate, children} = this.props

    return (
      <form onSubmit={onCreate}>
        <h3>Sign Up</h3>
        {children}
        <input type="submit" value="Create" />
      </form>
    )
  }
}
