import React from "react"
import Input from "../Base/Input"
import { connect } from 'react-redux'

import CreateContactFormContainer from "./CreateContactForm"
import EditContactFormContainer from "./EditContactForm"

import {createContact, updateContact, deleteContact, changeContact} from '../../actions'
import {toSchema, toForm} from '../../helpers'


const DISPLAY_NAMES = {
  'firstName': 'First Name',
  'lastName': 'Last Name',
  'email': 'Email',
  'phoneMobile': 'Mobile',
  'phoneWork': 'Work',
  'phoneHome': 'Home'
}

export class ContactForm extends React.Component {

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

const mapStateToProps = state => {
  return {
    contact: state.contact
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSelectContact: (contact) => {
      dispatch(selectContact(contact))
    },
    handleChangeContact: (key, val) => {
      dispatch(changeContact(key, val))
    }
  }
}

const ContactFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactForm)

export default ContactFormContainer
