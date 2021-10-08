import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice.js';

const ProtectedRoute = (props) => {
  const { token } = useSelector(selectCurrentUser);

  if (!token) {
    return <Redirect to='/login' />;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;
