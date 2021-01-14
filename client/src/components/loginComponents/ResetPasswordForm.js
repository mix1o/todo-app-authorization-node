import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Warning from './Warning';
const ResetPasswordForm = () => {
  const [passwordVis, setPasswordVis] = useState('password');
  const [isVisible, setIsVisible] = useState(true);

  const [userData, setUserData] = useState({
    Email: '',
    NewPassword: '',
    ConfirmNewPassword: '',
  });

  const handlerInput = (event) => {
    const target = event.target;
    const value = event.target.value;
    const name = target.name;

    setUserData({ ...userData, [name]: value });
  };

  const [message, setMessage] = useState('');

  const resetPassword = () => {
    fetch('/api/resetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((json) => {
        setMessage(json);
        if (json.correct) {
          setUserData({ Email: '', NewPassword: '', ConfirmNewPassword: '' });
        }
      });
  };
  const changePassType = (e) => {
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

  return (
    <>
      <div style={{ marginTop: '2rem' }} className="link__back">
        <Link style={{ margin: '2rem' }} to="/login">
          <svg
            width="40"
            height="40"
            viewBox="0 0 49 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="24.0475"
              cy="24.0475"
              r="23.0475"
              stroke="#4A5568"
              strokeWidth="2"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.344 25.55L24.56 33.4523L23.202 35L11 24.5L23.224 14L24.556 15.5813L15.348 23.45H39V25.55H15.344Z"
              fill="#4A5568"
            />
          </svg>
        </Link>
      </div>
      <main className="main__reset">
        <h1 className="section__header">Reset your Password</h1>
        <form className="section__formWrapper" name="reset password form">
          <label className="passwordForm__email form__label">
            <p className="label__paragraph">E-mail: </p>
            <input
              className="label__input label__input--email"
              type="email"
              name="Email"
              placeholder="Your E-mail"
              required
              value={userData.Email}
              onChange={(e) => handlerInput(e)}
            />
          </label>
          <label className="signUp__label--password form__label">
            <p className="label__paragraph">Password: </p>
            <input
              className="label__input label__input--password"
              type={passwordVis}
              name="NewPassword"
              placeholder="Password"
              value={userData.NewPassword}
              onChange={(e) => handlerInput(e)}
            />
          </label>
          <label className="signUp__label--password form__label">
            <p className="label__paragraph">Confirm Password: </p>
            <input
              className="label__input label__input--password"
              type={passwordVis}
              name="ConfirmNewPassword"
              placeholder="Password"
              value={userData.ConfirmNewPassword}
              onChange={(e) => handlerInput(e)}
            />
            <i
              tabIndex="0"
              role="checkbox"
              className="toggle_password"
              isVisible={isVisible}
              onClick={changePassType}
              onKeyUp={(e) => changePassType(e)}
            >
              {isVisible && (
                <svg
                  className="label__eye--closed label__eye"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.604 2.562l-3.346 3.137c-1.27-.428-2.686-.699-4.243-.699-7.569 0-12.015 6.551-12.015 6.551s1.928 2.951 5.146 5.138l-2.911 2.909 1.414 1.414 17.37-17.035-1.415-1.415zm-6.016 5.779c-3.288-1.453-6.681 1.908-5.265 5.206l-1.726 1.707c-1.814-1.16-3.225-2.65-4.06-3.66 1.493-1.648 4.817-4.594 9.478-4.594.927 0 1.796.119 2.61.315l-1.037 1.026zm-2.883 7.431l5.09-4.993c1.017 3.111-2.003 6.067-5.09 4.993zm13.295-4.221s-4.252 7.449-11.985 7.449c-1.379 0-2.662-.291-3.851-.737l1.614-1.583c.715.193 1.458.32 2.237.32 4.791 0 8.104-3.527 9.504-5.364-.729-.822-1.956-1.99-3.587-2.952l1.489-1.46c2.982 1.9 4.579 4.327 4.579 4.327z" />
                </svg>
              )}
              {!isVisible && (
                <svg
                  className="label__eye--closed label__eye"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z" />
                </svg>
              )}
            </i>
          </label>
          <label className="form__labelError">
            <Warning
              errorMessage={message.message}
              isCorrect={message.correct}
            />
          </label>
        </form>

        <section className="section__buttons">
          <button onClick={resetPassword} className=" btn__main--full">
            Reset
          </button>
        </section>
      </main>
    </>
  );
};

export default ResetPasswordForm;
