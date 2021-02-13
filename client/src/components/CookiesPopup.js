import React from 'react';
import { cookies } from './loginComponents/Icons';

const CookiesPopup = ({ acceptFunction, show }) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '30%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        background: '#000',
        zIndex: '3',
        width: '90%',
        padding: '2rem',
        backgroundColor: 'var(--header-color)',
      }}
    >
      <div>
        <p style={{ color: 'var(--white)', fontSize: '1.3rem' }}>
          We use technologies like cookies to store and/or access information on
          a device, such as unique identifiers and process non-sensitive
          personal data, such as IP address or browsing data for these
          activities: personalised ads and content, ad and content measurement,
          audience insights and product development.
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button
          className="heading__btn"
          style={{ margin: '2rem 0' }}
          onClick={() => acceptFunction()}
        >
          Accept all
        </button>
        <i>{cookies}</i>
      </div>
    </div>
  );
};

export default CookiesPopup;
