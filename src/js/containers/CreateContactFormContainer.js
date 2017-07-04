import { connect } from 'react-redux'
import CreateContactForm from '../components/Contacts/ContactForm/CreateContactForm'
import { createContact } from '../actions'

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
