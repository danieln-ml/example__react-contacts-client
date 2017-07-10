import React from "react"
import Form from "../Base/Form.jsx"
import { connect } from 'react-redux'
import { createContact } from '../../actions'

export class CreateContactForm extends React.Component {

  render() {
    const { user, contact, handleCreateContact, children } = this.props
    const onFormSubmit = (e) => {
      handleCreateContact(user, contact)
      e.preventDefault()
      e.stopPropagation()
    }
    return (
      <Form className="contact-form col-md-6" onSubmit={onFormSubmit}>
        <div className="contact-form-top">
          <h3 className="contact-form-top--title">Create Contact</h3>
        </div>

        <div className='editable-view'>
          {children}
          <div className="button-bar">
            <button type="submit" className="btn btn-primary pull-right">Create Contact</button>
          </div>
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

    handleCreateContact: (user, contact) => {
      dispatch(createContact(user, contact))
    }
  }
}

const CreateContactFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateContactForm)

export default CreateContactFormContainer
