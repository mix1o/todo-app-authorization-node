import { AnimatePresence } from 'framer-motion';
import { Switch, Route, useLocation } from 'react-router-dom';
import { MountTransition, MotionSlidIn } from './MountTransition';

export const SwitchTransition = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch location={location} key={location.pathname}>
        {children}
      </Switch>
    </AnimatePresence>
  );
};

export const RouteTransition = ({ children, exact, path, ...rest }) => {
  return (
    <Route exact={exact} path={path} {...rest}>
      <MountTransition path={path}>{children}</MountTransition>
    </Route>
  );
};

export const SlidInPresence = ({ children }) => {
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      {children}
    </AnimatePresence>
  );
};

export const SlidInItems = ({ children }) => {
  return <MotionSlidIn>{children}</MotionSlidIn>;
};
