export const changePassType = (e, passwordVis, setPasswordVis, setIsShown) => {
  if (e.keyCode === 9) {
    return;
  }

  if (passwordVis === 'password') {
    setPasswordVis('text');
    setIsShown(false);
  } else {
    setPasswordVis('password');
    setIsShown(true);
  }
};
