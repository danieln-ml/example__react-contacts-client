import React from "react"
import ContactApi from "../../services/ContactsApi.js"

export default class ContactLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: []
    }
    this.componentDidMount.bind(this)
  }

  componentDidMount() {
    ContactApi.fetchContacts().then( (res) => {
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
  render() {
    return (
      <section>
        <h2>Contacts</h2>
        <ul className="contact-list--list">
          {this.state.contacts.map((contact) => this.renderListItem(contact))}
        </ul>
      </section>
    )
  }

  renderListItem(contact) {
    const { _id, firstName, lastName } = contact
    return ( <li key={_id}> {`${firstName} ${lastName}`} </li> )
  }
}
