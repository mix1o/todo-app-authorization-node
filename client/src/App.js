import SignUp from './components/loginComponents/SignUp';
import SignIn from './components/loginComponents/SignIn';
import ResetPasswordForm from './components/loginComponents/ResetPasswordForm';
import UserPanel from './components/userDashboard/UserPanel';
import Todo from './components/todo/Todo';
import PayNow from './components/payments/PayNow';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  HashRouter,
} from 'react-router-dom';

import { useCookies } from 'react-cookie';
import MainStyle from './MainStyle.css';
function App() {
  const [cookies] = useCookies({});
  const { user } = cookies;

  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route exact path="/reset" component={ResetPasswordForm} />
          <Route exact path="/user-panel">
            {!user ? <Redirect to="/login" /> : <UserPanel />}
          </Route>
          {user && <Route exact path="/login" component={UserPanel} />}
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/pay-now" component={PayNow} />
          {user && <Route exact path="/todo" component={Todo} />}
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
