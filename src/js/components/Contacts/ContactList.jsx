import React from "react"

export default class ContactList extends React.Component {

  render() {
    const {selectedContactId, handleAddContact, contacts} = this.props
    return (
      <section className="contact-list col-md-6">
        <div className="contact-list-top">
          <h3 className="contact-list-top--title">Contacts</h3>
          { selectedContactId &&
            <button className="btn btn-primary btn-sm" onClick={handleAddContact}>+ Add Contact</button>
          }
        </div>

        <ul className="contact-list--list">
          { contacts.length ?
            contacts.map((contact) => this.renderListItem(contact))
            :
            <li className="contact-list--list-item m-empty">You haven't added any contacts, yet.</li>
          }
        </ul>
      </section>
    )
  }

  renderListItem(contact) {
    const { _id, firstName, lastName } = contact
    const selectedId = this.props.selectedContactId
    const selectedClass = selectedId && selectedId === _id ? "s-selected" : ""

    return (
      <li
        key={_id}
        className={`contact-list--list-item ${selectedClass}`}
        onClick={(e) => this.props.handleSelectContact(contact)}>
        {`${firstName} ${lastName}`}
      </li>
    )
  }
}
