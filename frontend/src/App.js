import { Route, Switch, useLocation } from 'react-router-dom';

import ProtectedRoute from './components/utils/ProtectedRoute.js';
import NotFound from './components/utils/NotFound.js';
import Header from './components/ui/Header.js';
import Footer from './components/ui/Footer.js';
import LoginScreen from './screens/LoginScreen.js';
import BoardsScreen from './screens/BoardsScreen.js';

function App() {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== '/login' && <Header />}

      <Switch>
        <Route exact path='/login' component={LoginScreen} />
        <ProtectedRoute exact path='/boards' component={BoardsScreen} />
        <ProtectedRoute path='*' component={NotFound} />
      </Switch>

      <Footer />
    </>
  );
}

export default App;
