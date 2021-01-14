import React from 'react';
import { Link } from 'react-router-dom';

const Popup = () => {
  return (
    <section className="popup">
      <h3
        style={{
          fontSize: '3rem',
          fontWeight: '700',
          color: '#1db95e',
          marginBottom: '4rem',
          paddingBottom: '2rem',
          borderBottom: '2px solid #fff',
        }}
      >
        Your account has been created
      </h3>
      <p>You will be redirect in a second</p>
      <div style={{ marginTop: '4rem' }}>
        <Link to="/login">
          <div
            style={{
              height: '5rem',
              width: '5rem',
              border: '2px solid #fff',
              borderRadius: '100%',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <svg
              className="arrowIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M22 12l-20 12 5-12-5-12z" />
            </svg>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Popup;
