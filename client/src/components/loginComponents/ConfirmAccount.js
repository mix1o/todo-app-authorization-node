import React, { useState } from 'react';
import { ConfirmIllustration } from './Icons';
import { useParams, Link, useHistory } from 'react-router-dom';
import Popup from './Popup';
import Warning from './Warning';

const ConfirmAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const history = useHistory();
  const { token } = useParams();

  const confirm = () => {
    fetch('/api/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then((response) => response.json())
      .then((json) => {
        setMessage(json);
        if (json.correct) {
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
      });
  };

  if (message.correct) {
    setTimeout(() => {
      history.push('/login');
    }, 3000);
  }

  return (
    <>
      <div className="popup-relative">
        <div style={{ textAlign: 'center' }} className="main__signIn">
          <div
            style={{ marginTop: '-1.5rem', width: '100%', textAlign: 'left' }}
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
            style={{ color: '#1db95e', fontSize: '4rem' }}
          >
            Confrim account
          </h2>
          <p style={{ fontSize: '1.8rem', width: '80%', color: '#2d3748' }}>
            Thank you for confirm your account
          </p>
          <div>{ConfirmIllustration}</div>
          <button
            onClick={() => confirm()}
            className="btn__main--full"
            style={{ width: '60%' }}
          >
            Confirm your account
          </button>
        </div>
        {isOpen && (
          <Warning setIsOpen={setIsOpen} errorMessage={message.message} />
        )}
        {message.correct && (
          <Popup
            title="You successful confrim account"
            message="You will be redirect to login"
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
                    <path d="M21.406 9.558c-1.21-.051-2.87-.278-3.977-.744.809-3.283 1.253-8.814-2.196-8.814-1.861 0-2.351 1.668-2.833 3.329-1.548 5.336-3.946 6.816-6.4 7.401v-.73h-6v12h6v-.904c2.378.228 4.119.864 6.169 1.746 1.257.541 3.053 1.158 5.336 1.158 2.538 0 4.295-.997 5.009-3.686.5-1.877 1.486-7.25 1.486-8.25 0-1.648-1.168-2.446-2.594-2.506zm-17.406 10.442h-2v-8h2v8zm15.896-5.583s.201.01 1.069-.027c1.082-.046 1.051 1.469.004 1.563l-1.761.099c-.734.094-.656 1.203.141 1.172 0 0 .686-.017 1.143-.041 1.068-.056 1.016 1.429.04 1.551-.424.053-1.745.115-1.745.115-.811.072-.706 1.235.109 1.141l.771-.031c.822-.074 1.003.825-.292 1.661-1.567.881-4.685.131-6.416-.614-2.239-.965-4.438-1.934-6.959-2.006v-6c3.264-.749 6.328-2.254 8.321-9.113.898-3.092 1.679-1.931 1.679.574 0 2.071-.49 3.786-.921 5.533 1.061.543 3.371 1.402 6.12 1.556 1.055.059 1.024 1.455-.051 1.584l-1.394.167s-.608 1.111.142 1.116z" />
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

export default ConfirmAccount;
