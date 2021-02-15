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
import { ScrollToTop, ScrollOfSearchBar } from './functions/ScrollTo';
import CookiesPopup from './components/CookiesPopup';
import {
  SwitchTransition,
  RouteTransition,
} from './components/animation/PageTransitions';
import { useEffect, useState } from 'react';

function App() {
  const [cookies] = useCookies({});
  const { user, accept } = cookies;
  const [state, actions] = useCounter();
  const [loadingAnimation, setStartAnimation] = useState(true);

  const acceptCookieHandler = () => {
    fetch('/cookie-accept', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => window.location.reload());
  };

  useEffect(() => {
    setTimeout(() => {
      setStartAnimation(false);
      actions.changeStateAnimation(true);
    }, 1500);
  }, []);

  window.addEventListener('load', () => {
    ScrollOfSearchBar();
  });

  return (
    <div className="App">
      <ScrollToTop />

      <SwitchTransition>
        <RouteTransition exact path="/">
          <Main />
        </RouteTransition>
        <RouteTransition exact path="/sign-up">
          <SignUp />
        </RouteTransition>
        <RouteTransition exact path="/reset">
          <ResetPasswordForm />
        </RouteTransition>
        <RouteTransition exact path="/reset/:token">
          <NewPassword />
        </RouteTransition>
        <RouteTransition exact path="/almost-there">
          {state.canSeeAlmost ? <AlmostThere /> : <Redirect to="/" />}
        </RouteTransition>
        <RouteTransition exact path="/almost-there/:token">
          <ConfirmAccount />
        </RouteTransition>
        <RouteTransition exact path="/user-panel">
          {!user ? <Redirect to="/login" /> : <UserPanel />}
        </RouteTransition>
        <RouteTransition exact path="/login">
          {user ? <Redirect to="/user-panel" /> : <SignIn />}
        </RouteTransition>
        {user && (
          <RouteTransition exact path="/completed-tasks">
            <Hisotry />
          </RouteTransition>
        )}
        {user && (
          <RouteTransition exact path="/todo">
            <Todo />
          </RouteTransition>
        )}
        <RouteTransition exact path="/terms">
          <Terms />
        </RouteTransition>
        {user && (
          <RouteTransition exact path="/subscription">
            <Subscription />
          </RouteTransition>
        )}
        {user && (
          <RouteTransition exact path="/confirm-pay">
            {state.count > 0 ? (
              <PaymentConfirm />
            ) : (
              <Redirect to="/subscription" />
            )}
          </RouteTransition>
        )}
        {user && (
          <RouteTransition exact path="/method-payment">
            <PaymentMethod />
          </RouteTransition>
        )}
        <RouteTransition exact path="/pay-now">
          {state.count > 1 ? <PayNow /> : <Redirect to="/subscription" />}
        </RouteTransition>
        {user && (
          <RouteTransition exact path="/settings">
            <Settings />
          </RouteTransition>
        )}
        <RouteTransition exact path="/policy">
          <Policy />
        </RouteTransition>
        <RouteTransition exact path="/about">
          <About />
        </RouteTransition>
        <RouteTransition exact path="/contact-us">
          <ContactUs />
        </RouteTransition>
        <RouteTransition exact path="/how-works" component={HoWorks}>
          <HoWorks />
        </RouteTransition>

        <RouteTransition>
          <NotFound />
        </RouteTransition>
      </SwitchTransition>

      {!accept && state.animationStop && (
        <CookiesPopup acceptFunction={acceptCookieHandler} />
      )}
    </div>
  );
}

export default App;
