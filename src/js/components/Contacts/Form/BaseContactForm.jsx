import React from "react"
import { connect } from 'react-redux'

import {changeContact} from '../../../actions'

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
    const { contact, user, titleText, buttonText, handleSubmit, handleDelete } = this.props

    const contactFields = contact ? Object.keys(contact) : []

    const submitContactAction = (e) => {
      handleSubmit(user, contact)
      e.preventDefault()
      e.stopPropagation()
    }

    const submitDelete = (e) => {
      handleDelete(user, contact._id)
      e.preventDefault()
      e.stopPropagation()
    }

    return (
      <form onSubmit={submitContactAction} className="contact-form col-md-6">
        <div className="contact-form-top">
          <h3 className="contact-form-top--title">{titleText}</h3>
        </div>

        <div className='editable-view'>
          { contactFields
              .filter(field => field !== '_id')
              .map((field, index) => this.renderInput(field, index)) }
          <div className="button-bar">
            { handleDelete && <button key="Delete" className="btn btn-danger pull-left" onClick={submitDelete}>Delete</button> }
            <button type="submit" className="btn btn-primary pull-right">{buttonText}</button>
          </div>
        </div>
      </form>
    )
  }

  renderInput(field, index) {
    const { handleChangeContact, contact } = this.props
    return (
      <div className="form-group" key={field}>
        <label className="form-label">{DISPLAY_NAMES[field]}</label>
        <input
          className="form-control"
          placeholder={DISPLAY_NAMES[field]}
          name={field}
          value={contact ? contact[field] : ''}
          type="text"
          onChange={handleChangeContact} />
      </div>
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
    handleChangeContact: (key, val) => {
      dispatch(changeContact(key, val))
    }
  }
}

const BaseContactForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactForm)

export default BaseContactForm
