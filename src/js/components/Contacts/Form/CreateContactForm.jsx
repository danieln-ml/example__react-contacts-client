import React from "react"
import { connect } from 'react-redux'
import { createContact } from '../../../actions'
import BaseContactForm from './BaseContactForm'

const mapStateToProps = state => {
  return {
    contact: state.contact,
    user: state.user,
    titleText: 'Create Contact',
    buttonText: 'Create'
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit: (user, contact) => {
      dispatch(createContact(user, contact))
    }
  }
}

const CreateContactFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseContactForm)

export default CreateContactFormContainer
