import React from 'react';
import * as RRD from 'react-router-dom';
import ProtectedRoute from './components/utils/ProtectedRoute.js';
import NotFound from './components/utils/NotFound.js';
import Header from './components/ui/Header.js';
import Footer from './components/ui/Footer.js';
import LoginScreen from './screens/LoginScreen.js';
import BoardsScreen from './screens/BoardsScreen.js';
import ListsScreen from './screens/ListsScreen.js';
import TemplatesScreen from './screens/TemplatesScreen.js';
import CreateBoardModal from './components/modals/CreateBoardModal.js';

function App() {
  const { pathname } = RRD.useLocation();

  return (
    <>
      {pathname !== '/login' && <Header />}

      <CreateBoardModal />
      <RRD.Switch>
        <RRD.Route exact path='/login' component={LoginScreen} />

        <ProtectedRoute exact path='/boards' component={BoardsScreen} />

        <ProtectedRoute
          exact
          path='/boards/templates'
          component={TemplatesScreen}
        />

        <ProtectedRoute exact path='/b/:id' component={ListsScreen} />

        <ProtectedRoute path='*' component={NotFound} />
      </RRD.Switch>

      <Footer />
    </>
  );
}

export default App;
