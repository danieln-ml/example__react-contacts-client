import { connect } from 'react-redux'
import ContactList from '../components/Contacts/ContactList'
import {selectContact, addContact} from '../actions'

const mapStateToProps = state => {
  return {
    contacts: state.contacts,
    selectedContactId: state.contact._id
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSelectContact: (contact) => {
      dispatch(selectContact(contact))
    },
    handleAddContact: () => {
      dispatch(addContact())
    }
  }
}

const ContactListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactList)

export default ContactListContainer
