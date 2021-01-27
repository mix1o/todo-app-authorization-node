export const changePassType = (
  e,
  passwordVis,
  setPasswordVis,
  setIsVisible
) => {
  if (e.keyCode === 9) {
    return;
  }

  if (passwordVis === 'password') {
    setPasswordVis('text');
    setIsVisible(false);
  } else {
    setPasswordVis('password');
    setIsVisible(true);
  }
};
