import React from "react"

export default class CreateContactForm extends React.Component {

  render() {
    const {submitHandler} = this.props
    return (
      <form onSubmit={submitHandler}>
        <h3>Create Contact</h3>
        {this.renderContactInputs()}
        <button type="submit">Create Contact</button>
      </form>
    )
  }
  renderContactInputs() {
    const {contact, changeHandler} = this.props
    const contactFields = contact ? Object.keys(contact) : []
    return (
       contactFields
        .filter(field => field !== '_id')
        .map((field, index) => {
            return (
              <div  key={index} className="form-group">
                <label>{field}</label>
                <input
                  key={index}
                  name={field}
                  value={contact ? contact[field] : ''}
                  placeholder={field}
                  onChange={changeHandler} />
              </div>
            )
        })
    )
  }
}
