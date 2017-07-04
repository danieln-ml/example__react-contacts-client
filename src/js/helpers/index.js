const toSchema = (contact) => {
  var body = {
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phoneNumbers: {
      mobile: contact.phoneMobile,
      work: contact.phoneWork,
      home: contact.phoneHome
    }
  }
  if (contact._id) {
    body._id = contact._id
  }
  return body
}

const toFormRep = (contact) => {
  const phoneNumbers = contact && contact.phoneNumbers
  return {
    _id: contact._id,
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phoneMobile: phoneNumbers && phoneNumbers.mobile,
    phoneWork: phoneNumbers && phoneNumbers.work,
    phoneHome: phoneNumbers && phoneNumbers.home
  }
}

const emptyContact = () => {
  return {
    _id: null,
    firstName: '',
    lastName: '',
    email: '',
    phoneMobile: '',
    phoneWork: '',
    phoneHome: ''
  }
}

const emptyUser = () => {
  return {
    _id: null,
    email: '',
    password: ''
  }
}


module.exports = {
  toSchema: toSchema,
  toForm: toFormRep,
  emptyContact: emptyContact,
  emptyUser: emptyUser
}
