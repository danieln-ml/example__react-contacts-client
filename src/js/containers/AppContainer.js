import { connect } from 'react-redux'
import App from '../components/App'

const mapStateToProps = state => {
  return {
    view: state.view,
    error: state.error
  };
}

const AppContainer = connect(
  mapStateToProps
)(App)

export default AppContainer
