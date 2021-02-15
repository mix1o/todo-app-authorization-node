import React from 'react';

const Popup = ({ title, message, iconLink, position }) => {
  return (
    <section style={position ? { top: '30%' } : {}} className="popup">
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
      <div style={{ marginTop: '2rem ' }}>{iconLink}</div>
    </section>
  );
};

export default Popup;
