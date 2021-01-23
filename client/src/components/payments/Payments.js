import React, { useState } from 'react';
import { CounterSubscriber, useCounter } from '../../store/sub';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../page/Header';
import Footer from '../page/Footer';
import Popup from '../loginComponents/Popup';
import {Link} from 'react-router-dom';

const PaymentWrapper = styled.div`
  background: var(--white);
  padding: 15px;
  width: 80%;
  text-align: center;
  margin: 0 auto;
  color: #000;
  transform: translateY(-200%);
`;

const Payments = ({ price }) => {
  const numberReg = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const dateReg = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
  const cvcReg = /^[0-9]{3}$/;

  const history = useHistory();
  const [state, actions] = useCounter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expireDate: '',
    cvc: '',
  });

  const handlerInput = (e) => {
    const target = e.target;
    const value = e.target.value;
    const name = target.name;

    setCardData({ ...cardData, [name]: value });
  };

  const pay = () => {
    if (
      numberReg.test(cardData.cardNumber) &&
      dateReg.test(cardData.expireDate) &&
      cvcReg.test(cardData.cvc)
    ) {
      console.log('ok');

      fetch('/api/payCard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price: state.count }),
      });
      history.push('/user-panel');
    } else {
      setMessage('Something went wrong. Please check your inputs');
    }
  };

  setTimeout(() => {
    setOpen(true);
  },800)
  return (
    <>
      <div className="popup-relative">
      <Header/>
        <main style={message.correct ? {filter: 'blur(3px)'} : {filter: 'blur(0px)'}}>
      <PaymentWrapper
        className={`${open ? 'aniamtion-payment' : ''}`}
        open={open}
      >
        <div className="exit" onClick={() => setOpen(false)}>
          X
        </div>
        <p>To Do List Payment</p>
        <p>{state.count}$ to pay</p>

        <label>
          <p>Card number: </p>
          <input
            name="cardNumber"
            value={cardData.cardNumber}
            onChange={(e) => handlerInput(e)}
            type="text"
          />
        </label>
        <div className="safe">
          <label>
            <p>Date</p>
            <input
              name="expireDate"
              placeholder="01/10"
              value={cardData.expireDate}
              onChange={(e) => handlerInput(e)}
              type="text"
            />
          </label>
          <label>
            <p>CVC</p>
            <input
              name="cvc"
              placeholder="123"
              value={cardData.cvc}
              onChange={(e) => handlerInput(e)}
              type="text"
            />
          </label>
        </div>

        <button onClick={pay}>Pay Now</button>
        {message.length > 2 && <p>{message}</p>}
      </PaymentWrapper>
      <Footer/>
      </main>
      {message.correct && <Popup title="Congratulation. You successful added credits" message="You will be redirect to dashboard" iconLink={<Link to="/login">
          <div className="container__popup__svg"
          >
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 16.166c0-4.289-4.465-5.483-7.887-7.091-2.079-1.079-1.816-3.658 1.162-3.832 1.652-.1 3.351.39 4.886.929l.724-3.295c-1.814-.551-3.437-.803-4.885-.841v-2.036h-2v2.134c-3.89.535-5.968 2.975-5.968 5.7 0 4.876 5.693 5.62 7.556 6.487 2.54 1.136 2.07 3.5-.229 4.021-1.993.451-4.538-.337-6.45-1.079l-.909 3.288c1.787.923 3.931 1.417 6 1.453v1.996h2v-2.105c3.313-.464 6.005-2.293 6-5.729z"/></svg>
          </div>
        </Link>}  />}
    </div>
    </>
  );
};

export default Payments;

