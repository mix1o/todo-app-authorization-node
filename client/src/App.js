import SignUp from './components/loginComponents/SignUp';
import SignIn from './components/loginComponents/SignIn';
import ResetPasswordForm from './components/loginComponents/ResetPasswordForm';
import UserPanel from './components/userDashboard/UserPanel';
import Todo from './components/todo/Todo';
import Terms from './components/page/Terms';
import Policy from './components/page/Policy';
import PayNow from './components/payments/PayNow';
import About from './components/page/About';
import ContactUs from './components/page/ContactUs';
import NotFound from './components/page/NotFound';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Main from './components/page/Main';
import { useCookies } from 'react-cookie';
import MainStyle from './MainStyle.css';
function App() {
  const [cookies] = useCookies({});
  const { user } = cookies;

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/reset" component={ResetPasswordForm} />
          <Route exact path="/user-panel">
            {!user ? <Redirect to="/login" /> : <UserPanel />}
          </Route>
          {user && <Route exact path="/login" component={UserPanel} />}
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/pay-now" component={PayNow} />
          {user && <Route exact path="/todo" component={Todo} />}
          <Route exact path="/terms" component={Terms} />
          <Route exact path="/policy" component={Policy} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact-us" component={ContactUs} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
