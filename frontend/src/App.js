import React from 'react';
import * as RRD from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/utils/ProtectedRoute.js';
import NotFound from './components/utils/NotFound.js';
import Header from './components/ui/Header.js';
import Footer from './components/ui/Footer.js';
import LoginScreen from './screens/LoginScreen.js';
import BoardsScreen from './screens/BoardsScreen.js';
import ListsScreen from './screens/ListsScreen.js';
import TemplatesScreen from './screens/TemplatesScreen.js';
import CreateBoardModal from './components/modals/CreateBoardModal.js';
import { currentBoard } from './features/boards/boardSlice.js';

function App() {
  const dispatch = useDispatch();
  const { pathname } = RRD.useLocation();

  const regex = new RegExp(/(?<=\/b\/).*/i);
  const id = pathname.match(regex);

  const { boards } = useSelector((s) => s.boards);
  const curBoard = boards && boards[id];

  React.useEffect(() => {
    if (id) {
      dispatch(currentBoard(curBoard));
    }
  }, [dispatch, id, curBoard]);

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
