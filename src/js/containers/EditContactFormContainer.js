import { connect } from 'react-redux'
import EditContactForm from '../components/Contacts/ContactForm/EditContactForm'
import { updateContact, deleteContact } from '../actions'
import {toSchema, toForm} from '../helpers'

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
