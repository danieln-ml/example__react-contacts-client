import React from "react"
import { connect } from 'react-redux'

import CreateContactFormContainer from "./CreateContactForm"
import EditContactFormContainer from "./EditContactForm"

export class ContactForm extends React.Component {

  render() {
    return (
      this.props.contact._id ?
        <EditContactFormContainer /> :
        <CreateContactFormContainer />
    )
  }

}

const ContactFormContainer = connect(
  state => ({ contact: state.contact })
)(ContactForm)

export default ContactFormContainer
