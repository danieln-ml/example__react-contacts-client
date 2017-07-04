import React from "react"
import ContactListContainer from "../../containers/ContactListContainer"
import ContactFormContainer from "../../containers/ContactFormContainer"


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
