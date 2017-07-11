import React from "react"
import ContactListContainer from "./List"
import ContactFormContainer from "./Form"

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
