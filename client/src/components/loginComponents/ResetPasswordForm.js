import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Warning from './Warning';
import Popup from './Popup';
import { ForgetPassword, Star } from './Icons';

const ResetPasswordForm = () => {
  const history = useHistory();
  const [Email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState('');
  const [message, setMessage] = useState('');

  const resetPassword = () => {
    fetch('/api/resetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Email }),
    })
      .then((response) => response.json())
      .then((json) => {
        setMessage(json);
        if (json.correct) {
          setIsOpen(false);
          setEmail('');
        } else {
          setIsOpen(true);
        }
      });
  };

  if (message.correct) {
    setTimeout(() => {
      history.push('/login');
    }, 2000);
  }

  return (
    <>
      <div className="popup-relative">
        <main
          className="main__reset"
          style={
            message.correct ? { filter: 'blur(3px)' } : { filter: 'blur(0px)' }
          }
        >
          <div
            style={{ marginTop: '2rem', width: '100%' }}
            className="link__back"
          >
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
          <h2
            className="heading-2"
            style={{ color: '#1db95e', marginTop: '4rem' }}
          >
            Forgot password?
          </h2>
          <form
            className="section__formWrapper"
            name="reset password form"
            style={{ display: 'inline-block', marginTop: '4rem' }}
          >
            <label className="passwordForm__email form__label">
              <div className="form__labelWrapper-para">
                {Star}
                <p className="label__paragraph" style={{ textAlign: 'left' }}>
                  E-mail:
                </p>
              </div>

              <input
                className="label__input label__input--email"
                type="email"
                name="Email"
                placeholder="Your E-mail"
                required
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <p
              style={{
                marginTop: '1.5rem',
                textAlign: 'left',
                width: '100%',
                color: 'var(--secondary-grey)',
              }}
            >
              {Star} Required fields
            </p>
          </form>

          <div style={{ margin: '10rem' }}>{ForgetPassword}</div>
          <section style={{ marginTop: '1rem' }} className="section__buttons">
            <button onClick={resetPassword} className=" btn__main--full">
              Send Password Reset
            </button>
          </section>
        </main>
        {isOpen && (
          <Warning
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            errorMessage={message.message}
          />
        )}
        {message.correct && (
          <Popup
            title="We have sent mail with reset link"
            message="You will be redirect in few seconds"
            size="2rem"
            iconLink={
              <Link to="/login">
                <div className="container__popup__svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="var(--white)"
                  >
                    <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
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

export default ResetPasswordForm;
