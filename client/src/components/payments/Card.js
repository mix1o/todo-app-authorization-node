import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CounterSubscriber, useCounter } from '../../store/sub';

const Card = ({ typeTitle, price, description }) => {
  const [state, actions] = useCounter();

  return (
    <div>
      <h3>{typeTitle}</h3>
      <p>{price}</p>
      <p>{description}</p>
      <button onClick={() => actions.payment(price)}>
        <Link to="/pay-now">Pay Now</Link>
      </button>
    </div>
  );
};

export default Card;
