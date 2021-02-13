import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Warning from './Warning';
import Confetti from 'react-confetti';
import { useHistory } from 'react-router-dom';
import Popup from './Popup';
import Recaptcha from 'react-recaptcha';
import { useCounter, CounterSubscriber } from '../../store/sub';
import { Star, OpenEye, ClosedEye } from './Icons';
import { changePassType } from './changePassType';

const RegisterationForm = () => {
  const history = useHistory();
  const useWindowSize = () => {
    const [size, setSize] = useState([window.innerHeight, window.innerWidth]);
    useEffect(() => {
      const handleResize = () => {
        setSize([window.innerHeight, window.innerWidth]);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    return size;
  };

  const [userData, setUserData] = useState({
    Firstname: '',
    Lastname: '',
    Email: '',
    Password: '',
  });
  const [catchError, setCatchError] = useState('');
  const [passwordVis, setPasswordVis] = useState('password');
  const [isShown, setIsShown] = useState(true);
  const [height, width] = useWindowSize();
  const [popup, setPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handlerInput = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setUserData({ ...userData, [name]: value });
  };

  const [recaptchaCheck, setRecaptachCheck] = useState(false);

  const [recaptchaLoad, setRecaptchaLoad] = useState(false);

  const [state, actions] = useCounter();

  const registration = () => {
    if (recaptchaLoad && recaptchaCheck) {
      fetch('/api/newuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((json) => {
          setCatchError(json);
          if (json.correct) {
            setPopup(true);
            setIsOpen(false);
            setUserData({
              Firstname: '',
              Lastname: '',
              Email: '',
              Password: '',
            });
            actions.setAlmost(true);
          } else {
            setIsOpen(true);
          }
        });
    } else if (recaptchaLoad === false) {
      fetch('/api/newuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.correct) {
            setPopup(true);
            setIsOpen(false);
            setUserData({
              Firstname: '',
              Lastname: '',
              Email: '',
              Password: '',
            });
            actions.setAlmost(true);
          } else {
            setIsOpen(true);
          }
          setCatchError(json);
        });
    } else if (recaptchaLoad === true && recaptchaCheck === false) {
      setIsOpen(true);
      setCatchError({ message: 'Please confrim you are not robot' });
    }
  };

  if (popup) {
    setTimeout(() => {
      history.push('/almost-there');
    }, 2000);
  }

  return (
    <>
      <Confetti
        run={popup}
        width={width}
        height={height}
        numberOfPieces={200}
        colors={['#1db95e', '#2d3748', '#4a5568']}
        tweenDuration={1}
        gravity={0.2}
      />

      <div className="popup-relative">
        <main
          style={{ filter: popup ? 'blur(3px)' : 'blur(0)' }}
          className="main__signUp"
        >
          <div
            style={{ marginTop: '2rem', width: '100%' }}
            className="link__back"
          >
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
          <h1 style={{ marginTop: '3rem' }} className="section__header">
            Create Account
          </h1>
          <form
            style={{ margin: '2rem' }}
            className="section__formWrapper"
            name="sign up form"
          >
            <label className="signUp__label--firstname form__label">
              <div className="form__labelWrapper-para">
                {Star}
                <p className="label__paragraph">First Name: </p>
              </div>
              <input
                className="label__input label__input--name"
                type="text"
                name="Firstname"
                placeholder="First Name"
                value={userData.Firstname}
                onChange={(e) => handlerInput(e)}
              />
            </label>

            <label className="signUp__label--lastname form__label ">
              <div className="form__labelWrapper-para">
                {Star}
                <p className="label__paragraph">Last Name: </p>
              </div>
              <input
                className="label__input label__input--surrname"
                type="text"
                name="Lastname"
                placeholder="Last Name"
                value={userData.Lastname}
                onChange={(e) => handlerInput(e)}
              />
            </label>
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
              />
              <i
                tabIndex="0"
                aria-roledescription="checkbox"
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
            <label className="form__label form__checkbox">
              <input
                name="Terms"
                type="checkbox"
                checked
                disabled
                onChange={(e) => handlerInput(e)}
                required
                className="label__checkbox"
              />
              <i className="checkbox__indicator"></i>

              <p className="label__terms">
                I agree to the
                <Link className="label__link" to="/terms">
                  <span className="label__tearms label__span--link">Terms</span>
                </Link>
                and
                <Link className="label__link" to="/policy">
                  <span className="label__policy label__span--link">
                    Privacy Policy.
                  </span>
                </Link>
              </p>
            </label>
            <p
              style={{
                textAlign: 'left',
                width: '100%',
                color: 'var(--secondary-grey)',
              }}
            >
              {Star} Required fields
            </p>
          </form>

          <Recaptcha
            sitekey="6Lf0_zQaAAAAAA74WFt8myKQ5t-oSLtuSDW1wwAH"
            render="explicit"
            onloadCallback={() => {
              setRecaptchaLoad(true);
            }}
            verifyCallback={() => {
              setRecaptachCheck(true);
            }}
          />

          <section style={{ marginTop: '2rem' }} className="section__buttons ">
            <button
              className="signUp__btn btn__main--full"
              onClick={() => {
                registration();
              }}
            >
              Sign Up
            </button>

            <div className="signUp_div_signIn">
              <p style={{ fontSize: '1.3rem' }}>Already have the account?</p>
              <button className="signUp__btn__signIn">
                <Link to="/login">Sign In</Link>
              </button>
            </div>
          </section>
        </main>
        {isOpen && (
          <Warning
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            errorMessage={catchError.message}
          />
        )}
        {catchError.correct && (
          <Popup
            title="Your account has been created"
            message="You will be redirect in a second"
            iconLink={
              <Link to="/">
                <div className="container__popup__svg">
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
              </Link>
            }
          />
        )}
      </div>
    </>
  );
};

export default RegisterationForm;
