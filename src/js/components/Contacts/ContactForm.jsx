import React from "react"
import Input from "../Inputs/Input.jsx"
import CreateContactForm from "./CreateContactForm.jsx"
import EditContactForm from "./EditContactForm.jsx"


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
    const { contact, className, onCreateContact, onUpdateContact, onDeleteContact } = this.props
    // const createHandler = this.wrapSubmission(onCreateContact, contact)

    const contactFields = contact ? Object.keys(contact) : []
    const contactInputs = (
      contactFields
        .filter(field => field !== '_id')
        .map((field, index) => this.renderInput(field, index))
    )

    const handleDeleteContact = (e) => {
      onDeleteContact(contact)
      e.preventDefault()
    }

    return (
      contact._id ?
        <EditContactForm
          submitHandler={() => onUpdateContact(contact)}
          deleteHandler={handleDeleteContact}
          className="col-md-6">
          {contactInputs}
        </EditContactForm>
        :
        <CreateContactForm
          submitHandler={() => onCreateContact(contact)}
          className="col-md-6">
          {contactInputs}
        </CreateContactForm>
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
        handleChange={this.props.onChangeContact} />
    )
  }
}
