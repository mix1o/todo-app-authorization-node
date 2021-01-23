import React from 'react';
import { Link } from 'react-router-dom';

const Popup = ({title,message,iconLink,size}) => {
  return (
    <section className="popup">
      <h3
        style={{
          fontSize: '3rem',
          fontSize: size,
          fontWeight: '700',
          color: '#1db95e',
          marginBottom: '4rem',
          paddingBottom: '2rem',
          borderBottom: '2px solid #fff',
        }}
      >
        {title}
      </h3>
      <p>{message}</p>
      <div style={{ marginTop: '4rem' }}>
        {iconLink}
      </div>
    </section>
  );
};

export default Popup;
