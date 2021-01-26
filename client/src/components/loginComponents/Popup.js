import React from 'react';

const Popup = ({ title, message, iconLink, size }) => {
  return (
    <section className="popup">
      <h3
        style={{
          fontSize: '3rem',
          fontWeight: '700',
          color: '#1db95e',
          marginBottom: '4rem',
          paddingBottom: '2rem',
          borderBottom: '2px solid #1db95e',
        }}
      >
        {title}
      </h3>
      <p className="popup__message">{message}</p>
      <div style={{ marginTop: '3rem ' }}>{iconLink}</div>
    </section>
  );
};

export default Popup;
