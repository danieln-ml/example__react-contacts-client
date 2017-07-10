import React from "react"
import { connect } from 'react-redux'

import { updateContact, deleteContact } from '../../actions'
import {toSchema, toForm} from '../../helpers'

import Form from "../Base/Form.jsx"

export class EditContactForm extends React.Component {

  render() {
    const {handleUpdateContact, handleDeleteContact, children, user, contact} = this.props
    const handleUpdate =  (e) => {
      handleUpdateContact(user, contact)
      e.preventDefault()
      e.stopPropagation()
    }
    const handleDelete =  (e) => {
      if (confirm("Are you sure you want to delete this contact?")) {
        handleDeleteContact(user, contact._id)
      }
      e.preventDefault()
      e.stopPropagation()
    }
    return (
      <Form className="contact-form col-md-6" onSubmit={handleUpdate}>
        <div className="contact-form-top">
          <h3 className="contact-form-top--title">Edit Contact</h3>
        </div>

        {children}

        <div className="button-bar">
          <button type="submit" key="Save"  className="btn btn-primary pull-right">Save Changes</button>
          <button key="Delete" className="btn btn-danger pull-left" onClick={handleDelete}>Delete</button>
        </div>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return {
    contact: state.contact,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    children: ownProps.children,

    handleUpdateContact: (userId, contact) => {
      dispatch(updateContact(userId, contact))
    },

    handleDeleteContact: (userId, contactId) => {
      dispatch(deleteContact(userId, contactId))
    }
  }
}

const EditContactFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditContactForm)

export default EditContactFormContainer
