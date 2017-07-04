import React from "react"
import Input from "../Input"

export default class UserForm extends React.Component {

  render() {
    const { user, onFieldChange, submitAction, actionText } = this.props

    const emailHandler    = (e) => { onFieldChange("email", e.target.value) }
    const passwordHandler = (e) => { onFieldChange("password", e.target.value) }
    const submitHandler = (e) => {
      submitAction(user)
      e.preventDefault()
      e.stopPropagation()
    }

    return (
      <section className="col-md-6 col-md-offset-3">
        <h3>{actionText}</h3>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange = {emailHandler}
              placeholder="admin@carbon.io"
              className="form-control" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange = {passwordHandler}
              placeholder="password"
              className="form-control" />
          </div>
          <input type="submit" className="btn btn-primary pull-right" value={actionText} />
        </form>
      </section>
    )
  }
}
