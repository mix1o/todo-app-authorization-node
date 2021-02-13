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
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Main from './components/page/Main';
import { useCookies } from 'react-cookie';
import Hisotry from './components/page/History';
import { useCounter } from './store/sub';
import PaymentConfirm from './components/payments/PaymentConfirm';
import PaymentMethod from './components/payments/PaymentMethod';
import NewPassword from './components/loginComponents/NewPassword';
import AlmostThere from './components/loginComponents/AlmostThere';
import ConfirmAccount from './components/loginComponents/ConfirmAccount';
import Settings from './components/page/Settings';
import ScrollToTop from './functions/ScrollToTop';
import CookiesPopup from './components/CookiesPopup';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [cookies] = useCookies({});
  const { user, accept } = cookies;
  const [state, actions] = useCounter();
  const location = useLocation();

  const acceptCookieHandler = () => {
    fetch('/cookie-accept', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => window.location.reload());
  };
  //location={location} key={location.key}
  return (
    <div className="App">
      <ScrollToTop />
      {/* <AnimatePresence> */}
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/reset" component={ResetPasswordForm} />

        <Route exact path="/reset/:token" component={NewPassword} />

        <Route exact path="/almost-there">
          {state.canSeeAlmost ? <AlmostThere /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/almost-there/:token" component={ConfirmAccount} />
        <Route exact path="/user-panel">
          {!user ? <Redirect to="/login" /> : <UserPanel />}
        </Route>
        <Route exact path="/login">
          {user ? <Redirect to="/user-panel" /> : <SignIn />}
        </Route>
        {user && <Route exact path="/completed-tasks" component={Hisotry} />}
        {user && <Route exact path="/todo" component={Todo} />}
        <Route exact path="/terms" component={Terms} />
        {user && <Route exact path="/subscription" component={Subscription} />}
        {user && (
          <Route exact path="/confirm-pay">
            {state.count > 0 ? (
              <PaymentConfirm />
            ) : (
              <Redirect to="/subscription" />
            )}
          </Route>
        )}
        {user && (
          <Route exact path="/method-payment" component={PaymentMethod} />
        )}
        <Route exact path="/pay-now">
          {state.count > 1 ? <PayNow /> : <Redirect to="/subscription" />}
        </Route>
        {user && <Route exact path="/settings" component={Settings} />}
        <Route exact path="/policy" component={Policy} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact-us" component={ContactUs} />
        <Route exact path="/how-works" component={HoWorks} />

        <Route component={NotFound} />
      </Switch>
      {/* </AnimatePresence> */}
      {!accept && state.animationStop && (
        <CookiesPopup acceptFunction={acceptCookieHandler} />
      )}
    </div>
  );
}

export default App;
