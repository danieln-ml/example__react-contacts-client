import React from "react"
import ContactsApi from "../../services/ContactsApi.js"
import ContactList from "../Contacts/ContactList.jsx"
import CreateContactForm from "../Contacts/CreateContactForm.jsx"


export default class ContactLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedContact: this.emptyContact(),
      contacts: []
    }
  }

  componentDidMount() {
    ContactsApi.fetchContacts().then( (res) => {
        let contacts = res.data.map(contact => {
          return {
            _id: contact._id,
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            phoneMobile: contact.phoneNumbers.mobile || '',
            phoneWork: contact.phoneNumbers.work || '',
            phoneHome: contact.phoneNumbers.home || '',
          }
        })
        this.setState({ contacts: contacts })
      },
      (error) => {
        console.error(error.message)
      }
    )
  }

  emptyContact() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phoneMobile: "",
      phoneWork: "",
      phoneHome: ""
    }
  }

  handleChangeContact = (e)  => {
    const { name, value } = e.target
    let { selectedContact } = this.state
    selectedContact[name] = value

    this.setState({
      selectedContact: selectedContact
    })
  }

  handleCreateContact = (e) => {
    const {selectedContact} = this.state
    ContactsApi.createContact(selectedContact).then(
      (res) => {
        const { _id } = res.data
        const newContact = Object.assign(selectedContact, { _id: _id } )
        this.state.contacts.push(newContact)
        this.setState({
          selectedContact: this.emptyContact(),
          contacts: this.state.contacts.slice()
        })
      },
      (err) => { console.error(JSON.stringify(err)) }
    )
    e.preventDefault()
  }

  render() {
    const { selectedContact, contacts } = this.state
    return (
      <div>
        <ContactList contacts={contacts} />
        <CreateContactForm
          contact={selectedContact}
          submitHandler={this.handleCreateContact}
          changeHandler={this.handleChangeContact}/>
      </div>
    )
  }
}
