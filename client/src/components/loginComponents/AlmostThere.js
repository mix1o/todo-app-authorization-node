import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AlmostThereIllustration } from './Icons';

const AlmostThere = () => {
  const history = useHistory();

  setTimeout(() => {
    history.push('/login');
  }, 6000);

  return (
    <>
      <div className="popup-relative">
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
        <div
          style={{ textAlign: 'center' }}
          className="almost__there__section main__signIn"
        >
          <h2
            className="heading-2"
            style={{ color: '#1db95e', fontSize: '4.4rem' }}
          >
            Almost there
          </h2>
          <p style={{ fontSize: '1.8rem', width: '80%', color: '#2d3748' }}>
            Please check your email address. And confirm your account to finish
            registration process
          </p>
          <p
            style={{
              fontSize: '1.5rem',
              width: '80%',
              color: '#2d3748',
              marginTop: '-5rem',
            }}
          >
            You will be redirect to login
          </p>
          <div>{AlmostThereIllustration}</div>
        </div>
      </div>
    </>
  );
};

export default AlmostThere;
