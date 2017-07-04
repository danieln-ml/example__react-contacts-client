import { connect } from 'react-redux'
import Header from '../components/Base/Header'
import { switchView } from '../actions'

const getButtonText = (view) => {
  switch(view) {
    case 'SIGNUP':
      return {
        nextView: 'LOGIN',
        text: 'Log In'
      };
    case 'CONTACTS':
      return {
        nextView: 'LOGIN',
        text: 'Logout'
      };
    default:
      // make login the default view
      return {
        nextView: 'SIGNUP',
        text: 'Sign up'
      };
  }
}

const mapStateToProps = state => {
  return getButtonText(state.view)
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLinkClick: (nextView) => {
      return () => {
        dispatch(switchView(nextView))
      }
    }
  }
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
