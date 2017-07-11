import {toSchema, toForm, emptyUser, emptyContact} from '../helpers'

const reducer = (state = defaultState, action) => {
  var newUser, newContact;

  switch (action.type) {

    case 'SWITCH_VIEW':
      // only one transitions changes other
      // parts of the state CONTACTS -> LOGIN => LOGOUT
      const nextView = action.payload
      if (state.view === 'CONTACTS' && nextView === 'LOGIN') {
        return { ...state, view: nextView, user: emptyUser() }
      } else {
        return { ...state, view: nextView }
      }

    // handle asyncActions
    case 'LOGIN_USER_FULFILLED':
    case 'CREATE_USER_FULFILLED':
      newUser = { ...state.user, _id: action.payload }
      return { ...state, user: newUser, view: 'CONTACTS'}

    case 'CHANGE_USER':
      var newAttrs = action.payload
      newUser = Object.assign({}, state.user, action.payload)
      return { ...state, user: newUser }

    // Contacts reducers
    case 'FETCH_CONTACTS_FULFILLED':
      return { ...state, contacts: action.payload }

    case 'CREATE_CONTACT_FULFILLED':
      newContact = action.payload
      return {
        ...state,
        contact: action.payload,
        contacts: [...state.contacts, newContact]
      }

    case 'UPDATE_CONTACT_FULFILLED':
      // no op data already correct
      return state

    case 'DELETE_CONTACT_FULFILLED':
      return {
        ...state,
        contact: emptyContact(),
        contacts: state.contacts.filter(c => c._id !== action.payload)
      }

    case 'ADD_CONTACT':
      return { ...state, contact: emptyContact() }

    case 'SELECT_CONTACT':
      return { ...state, contact: action.payload }

    case 'CHANGE_CONTACT':
      var updatedContact = Object.assign({}, state.contact, action.payload);
      var updatedContacts = state.contacts;

      if (updatedContact._id) {
        updatedContacts = state.contacts.map(c => {
          if (updatedContact._id === c._id) {
            return updatedContact;
          }
          return c;
        });
      }
      return { ...state, contact: updatedContact, contacts: updatedContacts }

    case 'LOGIN_USER_REJECTED':
    case 'CREATE_USER_REJECTED':
    case 'FETCH_CONTACTS_REJECTED':
    case 'CREATE_CONTACT_REJECTED':
    case 'UPDATE_CONTACT_REJECTED':
    case 'DELETE_CONTACT_REJECTED':
      return { ...state, error: action.payload }

    default:
      return state
  }
}

export default reducer
