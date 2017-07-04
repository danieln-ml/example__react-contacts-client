import { connect } from 'react-redux'
import ContactForm from '../components/Contacts/ContactForm/ContactForm'
import {createContact, updateContact, deleteContact, changeContact} from '../actions'
import {toSchema, toForm} from '../helpers'

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
