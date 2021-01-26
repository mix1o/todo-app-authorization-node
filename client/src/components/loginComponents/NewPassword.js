import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Warning from './Warning';
import Popup from './Popup';
import { ForgetPassword, Star } from './Icons';

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confrimNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const password = () => {
    fetch('/api/newPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newPassword, confrimNewPassword, token }),
    })
      .then((response) => response.json())
      .then((json) => {
        setMessage(json);
        if (json.correct) {
          setNewPassword('');
          setConfirmNewPassword('');
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
      });
  };

  return (
    <>
      <div className="popup-relative">
        <main className="main__reset">
          <div
            style={{ marginTop: '2rem', width: '100%', textAlign: 'left' }}
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
            <label
              className="passwordForm__email form__label"
              style={{ display: 'block', marginTop: '3rem' }}
            >
              <div className="form__labelWrapper-para">
                {Star}
                <p className="label__paragraph" style={{ textAlign: 'left' }}>
                  New password:
                </p>
              </div>
              <input
                className="label__input label__input--email"
                type="password"
                placeholder="New password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <label
              className="passwordForm__email form__label"
              style={{ display: 'block', marginTop: '3rem' }}
            >
              <div className="form__labelWrapper-para">
                {Star}
                <p className="label__paragraph" style={{ textAlign: 'left' }}>
                  Confirm new password:
                </p>
              </div>
              <input
                className="label__input label__input--email"
                type="password"
                placeholder="Confirm new password"
                required
                value={confrimNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </label>
          </form>
          <div style={{ marginTop: '1rem' }}>{ForgetPassword}</div>

          <section className="section__buttons">
            <button className="btn__main--full" onClick={password}>
              Set new password
            </button>
          </section>
        </main>
        {message.correct && (
          <Popup
            title="Successful! Your password has been changed"
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
                  >
                    <path d="M16 2c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6zm0-2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm-5.405 16.4l-1.472 1.6h-3.123v2h-2v2h-2v-2.179l5.903-5.976c-.404-.559-.754-1.158-1.038-1.795l-6.865 6.95v5h6v-2h2v-2h2l2.451-2.663c-.655-.249-1.276-.562-1.856-.937zm7.405-11.4c.551 0 1 .449 1 1s-.449 1-1 1-1-.449-1-1 .449-1 1-1zm0-1c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2z" />
                  </svg>
                </div>
              </Link>
            }
          />
        )}
        {isOpen && (
          <Warning setIsOpen={setIsOpen} errorMessage={message.message} />
        )}
      </div>
    </>
  );
};

export default NewPassword;
