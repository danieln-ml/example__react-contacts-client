import React from "react"
import ContactsApi from "../../services/ContactsApi.js"
import ContactList from "../Contacts/ContactList.jsx"
import ContactForm from "../Contacts/ContactForm.jsx"


export default class ContactLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedContact: this.initContact(),
      contacts: []
    }
  }

  componentDidMount() {
    ContactsApi.fetchContacts().then(
      (res) => {
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

  initContact() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phoneMobile: "",
      phoneWork: "",
      phoneHome: ""
    }
  }

  addStagedContact = () => {
    this.setState({
      selectedContact: this.initContact()
    })
  }

  handleSelectContact = (id) => {
    let selectedContact = this.state.contacts.find(c => c._id ===  id)
    this.setState({'selectedContact': selectedContact })
  }

  handleChangeContact = (key, val) => {
    let { selectedContact, contacts } = this.state
    selectedContact[key] = val

    if (selectedContact._id) {
      let cIndex = contacts.findIndex(c => selectedContact._id === c._id)
      if (cIndex !== -1) {
        contacts[cIndex] = selectedContact
      }
    }

    this.setState({
      "selectedContact": selectedContact,
      "contacts": contacts.slice()
    })
  }

  handleServerError = (err) => { console.error(err) }

  handleCreateContact = (contact) => {
    ContactsApi.createContact(contact).then(
      (res) => {
        let { _id } = response.data
        let newContact = Object.assign(contact, { _id: _id } )
        this.state.contacts.push(newContact)
        this.setState({
          selectedContact: this.initContact(),
          contacts: this.state.contacts.slice()
        })
      },
      this.handleServerError
    )
  }

  handleDeleteContact = (contact) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      const contactId = contact._id
      ContactsApi.removeContact(contactId).then(
        (res) => {
          let cIndex = this.state.contacts.findIndex(c => c._id === contactId)
          this.state.contacts.splice(cIndex, 1)

          this.setState({
            selectedContact: this.initContact(),
            contacts: this.state.contacts.slice()
          })
        },
        this.handleServerError
      )
    }
  }

  handleUpdateContact = (contactId) => {
    const cIndex = this.state.contacts.findIndex(c => c._id === contactId)
    const contact = Object.assign({}, this.state.selectedContact)
    this.state.contacts[cIndex] = contact

    ContactsApi.updateContact(contact).then(
      (res) => {
        this.setState({
          selectedContact: this.initContact(),
          contacts: this.state.contacts.slice()
        })
      },
      this.handleServerError
    )
  }

  render() {
    return (
      <div className="row">
        <ContactList
          contacts={this.state.contacts}
          selectedContact={this.state.selectedContact}
          handleSelectContact={this.handleSelectContact}
          addContactAction={this.addStagedContact}
          className="col-md-6" />

        <ContactForm
          contact={this.state.selectedContact}
          className="col-md-6"
          onChangeContact={this.handleChangeContact}
          onCreateContact={this.handleCreateContact}
          onUpdateContact={this.handleUpdateContact}
          onDeleteContact={this.handleDeleteContact} />
      </div>
    )
  }
}
