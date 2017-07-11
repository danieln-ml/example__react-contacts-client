import React from "react"
import { connect } from 'react-redux'
import { updateContact, deleteContact } from '../../../actions'
import BaseContactForm from './BaseContactForm'

const mapStateToProps = state => {
  return {
    contact: state.contact,
    user: state.user,
    titleText: 'Edit Contact',
    buttonText: 'Save'
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit: (user, contact) => {
      dispatch(updateContact(user, contact))
    },
    handleDelete: (user, contactId) => {
      dispatch(deleteContact(user, contactId))
    }
  }
}

const EditContactFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseContactForm)

export default EditContactFormContainer
