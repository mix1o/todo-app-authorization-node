import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { changePassType } from './changePassType';
import { Star, OpenEye, ClosedEye } from './Icons';
import Popup from './Popup';
import Warning from './Warning';

const SignIn = () => {
  const [message, setMessage] = useState('');
  const [passwordVis, setPasswordVis] = useState('password');
  const [isShown, setIsShown] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({
    Email: '',
    Password: '',
  });

  const handlerInput = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setUserData({ ...userData, [name]: value });
  };

  const hanlderSign = () => {
    fetch('/api/login', {
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
          setIsOpen(false);
          setTimeout(() => {
            window.location.href = '/user-panel';
          }, 1000);
        } else {
          setIsOpen(true);
        }
      });
  };

  return (
    <>
      <div className="popup-relative">
        <main
          className="main__signIn"
          style={
            message.correct ? { filter: 'blur(3px)' } : { filter: 'blur(0px)' }
          }
        >
          <div style={{ width: '100%' }} className="link__back">
            <Link style={{ margin: '2rem' }} to="/">
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

          <h1 className="section__header">Sign In</h1>
          <form className="section__formWrapper" name="sign in form">
            <label className="signUp__label--email form__label">
              <div className="form__labelWrapper-para">
                {Star}
                <p className="label__paragraph">E-mail address:</p>
              </div>
              <input
                className="label__input label__input--email"
                type="email"
                name="Email"
                placeholder="Your e-mail  address"
                required
                value={userData.Email}
                onChange={(e) => handlerInput(e)}
              />
            </label>
            <label className="signUp__label--password form__label">
              <div className="form__labelWrapper-para">
                {Star}
                <p className="label__paragraph">Password: </p>
              </div>
              <input
                className="label__input label__input--password"
                type={passwordVis}
                name="Password"
                placeholder="Password"
                value={userData.name}
                onChange={(e) => handlerInput(e)}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    hanlderSign();
                  }
                }}
              />
              <i
                tabIndex="0"
                aria-label="checkbox"
                className="toggle_password"
                onClick={(e) =>
                  changePassType(e, passwordVis, setPasswordVis, setIsShown)
                }
                onKeyUp={(e) =>
                  changePassType(e, passwordVis, setPasswordVis, setIsShown)
                }
              >
                {isShown && ClosedEye}
                {!isShown && OpenEye}
              </i>
            </label>
            <label className="signUp__label--resetPass form__label">
              <p className="label__par--link label__span--link">
                <Link className="label__link" to="/reset">
                  Forgot Password?
                </Link>
              </p>
            </label>
            <p
              className=" required__fields"
              style={{
                textAlign: 'left',
                width: '100%',
                color: 'var(--secondary-grey)',
              }}
            >
              {Star} Required fields
            </p>
          </form>

          <section className="section__buttons">
            <button
              onClick={() => {
                hanlderSign();
              }}
              className="signIn__btn btn__main--full "
            >
              Login
            </button>
            <p
              className="label__paragraph"
              style={{ textAlign: 'center', marginBottom: '2rem' }}
            >
              Don't have an account <Link to="/sign-up">Create one</Link>
            </p>
          </section>
        </main>
        {isOpen && (
          <Warning
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            errorMessage={message.message}
          />
        )}
        {message.correct && (
          <Popup
            title="You are logged in"
            message="You will be redirect to dashboard"
            iconLink={
              <div className="container__popup__svg ">
                <svg
                  className="arrowIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="var(--white)"
                >
                  <path d="M22 12l-20 12 5-12-5-12z" />
                </svg>
              </div>
            }
          />
        )}
      </div>
    </>
  );
};

export default SignIn;
