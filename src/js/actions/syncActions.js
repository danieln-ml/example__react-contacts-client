export const changeUser = (userKey, userVal) => {
  return {
    type: 'CHANGE_USER',
    payload: { [userKey]: userVal }
  }
}

export const loginUser = (user) => {
  return {
    type: 'LOGIN_USER',
    user: user
  }
}

export const changeContact = (contactKey, contactVal) => {
  return {
    type: 'CHANGE_CONTACT',
    payload: { [contactKey]: contactVal }
  }
}

export const selectContact = (contact) => {
  return {
    type: 'SELECT_CONTACT',
    payload: contact
  }
}

export const addContact = () => {
  return {
    type: 'ADD_CONTACT'
  }
}


export const switchView = (view) => {
  return {
    type: 'SWITCH_VIEW',
    payload: view
  }
}
