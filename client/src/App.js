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
import HoWorks from './components/page/HoWorks';
import Subscription from './components/payments/Subscriptions';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Main from './components/page/Main';
import { useCookies } from 'react-cookie';
import MainStyle from './MainStyle.css';
import StyleEffects from './StyleEffects.css';
import Hisotry from './components/page/History';
import { useEffect, useState } from 'react';
import { CounterSubscriber, useCounter } from './store/sub';
import PaymentConfirm from './components/payments/PaymentConfirm';
import PaymentMethod from './components/payments/PaymentMethod';
import NewPassword from './components/loginComponents/NewPassword';

function App() {
  const [cookies] = useCookies({});
  const { user } = cookies;

  const [state, actions] = useCounter();

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/reset" component={ResetPasswordForm} />
          <Route exact path="/reset/:token" component={NewPassword} />
          <Route exact path="/user-panel">
            {!user ? <SignIn /> : <UserPanel />}
          </Route>
          {/* {user && <Route exact path="/login" component={UserPanel} />} */}
          {/* <Route exact path="/login" component={SignIn}/> */}
          <Route exact path="/login">
            {user ? <UserPanel /> : <SignIn />}
          </Route>
          {user && <Route exact path="/completed-tasks" component={Hisotry} />}
          {user && <Route exact path="/todo" component={Todo} />}
          <Route exact path="/terms" component={Terms} />
          <Route exact path="/subscription" component={Subscription} />
          {user ? (
            <Route exact path="/confirm-pay">
              {state.count > 0 ? (
                <PaymentConfirm />
              ) : (
                <Redirect to="/subscription" />
              )}
            </Route>
          ) : (
            <Redirect to="/login" />
          )}
          <Route exact path="/method-payment" component={PaymentMethod} />
          <Route exact path="/pay-now" component={PayNow} />

          <Route exact path="/settings">
            <h3>Settings</h3>
          </Route>
          <Route exact path="/policy" component={Policy} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact-us" component={ContactUs} />
          <Route exact path="/how-works" component={HoWorks} />

          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
