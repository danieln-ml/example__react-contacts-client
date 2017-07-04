import React from "react"
import Input from "../../Input"
import CreateContactForm from "./CreateContactForm"
import EditContactForm from "./EditContactForm"
import EditContactFormContainer from '../../../containers/EditContactFormContainer'
import CreateContactFormContainer from '../../../containers/CreateContactFormContainer'


const DISPLAY_NAMES = {
  'firstName': 'First Name',
  'lastName': 'Last Name',
  'email': 'Email',
  'phoneMobile': 'Mobile',
  'phoneWork': 'Work',
  'phoneHome': 'Home'
}

export default class ContactForm extends React.Component {

  render() {
    const { contact, onCreateContact, onUpdateContact, onDeleteContact } = this.props

    const contactFields = contact ? Object.keys(contact) : []
    const contactInputs = (
      contactFields
        .filter(field => field !== '_id')
        .map((field, index) => this.renderInput(field, index))
    )

    return (
      contact._id ?
        <EditContactFormContainer>
          {contactInputs}
        </EditContactFormContainer>
        :
        <CreateContactFormContainer>
          {contactInputs}
        </CreateContactFormContainer>
    )
  }

  renderInput(field, index) {
    return (
      <Input
        key={index}
        name={field}
        label={DISPLAY_NAMES[field]}
        value={this.props.contact ? this.props.contact[field] : ''}
        placeholder={DISPLAY_NAMES[field]}
        handleChange={this.props.handleChangeContact} />
    )
  }
}
