import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';

import Header from './components/ui/Header.js';
import Footer from './components/ui/Footer.js';
import LoginScreen from './screens/LoginScreen.js';
import Grid from '@mui/material/Grid';
// import { useSelector, useDispatch } from 'react-redux';
// import { useGetBoardsQuery } from './features/boards/boardsSlice.js';

function App() {
  // const dispatch = useDispatch();
  // const count = useSelector((s) => s.counter.value);

  /* <div className=''>User boards fetched: {data.length}</div>
      {data.map((board) => (
        <div key={board._id} className='div'>
          {board.title}
        </div>
      ))} */

  // const { data = [], isFetching } = useGetBoardsQuery();
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== '/login' && <Header />}

      <Switch>
        <Route exact path='/login' component={LoginScreen} />
        <Route exact path='/' />
      </Switch>

      <Footer />
    </>
  );
}

export default App;
