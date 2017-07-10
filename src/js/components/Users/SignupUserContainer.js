import { connect } from 'react-redux'
import UserForm from './UserForm'
import {changeUser, createUser} from '../../actions'

const mapStateToProps = state => {
  return {
    user: state.user,
    actionText: 'Sign Up'
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFieldChange: (key, val) => {
      dispatch(changeUser(key, val))
    },
    submitAction: (user) => {
      dispatch(createUser(user))
    }
  }
}

const SignupUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm)

export default SignupUserContainer
