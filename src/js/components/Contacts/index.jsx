import React from "react"
import ContactListContainer from "./ContactList"
import ContactFormContainer from "./ContactForm"

export default class ContactLayout extends React.Component {

  render() {
    return (
      <div className="row">
        <ContactListContainer />
        <ContactFormContainer />
      </div>
    )
  }
}
