import React from "react"
import ContactApi from "../../services/ContactsApi.js"

export default class ContactLayout extends React.Component {
  render() {
    const { contacts } = this.props

    return (
      <div>
        <h2>Your Contacts</h2>
        <ul>
          {contacts.length ? this.renderContactItems() : this.renderEmptyContactItem()}
        </ul>
      </div>
    )
  }

  renderContactItems() {
    return this.props.contacts.map(contact => {
      const {_id, firstName, lastName} = contact
      return (<li key={_id}> {`${firstName} ${lastName}`} </li>)
    })
  }
  renderEmptyContactItem() {
    return (<li>You do not have any contacts!!!</li>)
  }

}
