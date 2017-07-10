import { connect } from 'react-redux'
import UserForm from './UserForm'
import {changeUser, authenticateUser} from '../../actions'

const mapStateToProps = state => {
  return {
    user: state.user,
    actionText: 'Log In'
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFieldChange: (key, val) => {
      dispatch(changeUser(key, val))
    },
    submitAction: (user) => {
      dispatch(authenticateUser(user))
    }
  }
}

const LoginUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm)

export default LoginUserContainer
