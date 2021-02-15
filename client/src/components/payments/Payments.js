import React, { useState } from 'react';
import { useCounter, CounterSubscriber } from '../../store/sub';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../page/Footer';
import Popup from '../loginComponents/Popup';
import { Link } from 'react-router-dom';
import BasicLoadingAni from '../animation/BasicLoadingAni';
import Warning from '../loginComponents/Warning';
import { CreditCard, Calendar, Lock, Profile } from './CreditCardIcons';
import HamburgerTop from '../Hamburger/HamburgerTop';
import MenuBottom from '../Hamburger/MenuBottom';

const CardCVCDate = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 2rem;
`;
const Cardinfo = styled.label`
  position: relative;
  width: ${({ width }) => width};
  min-width: 80px;
`;

const Payments = ({ price }) => {
  const numberReg = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const dateReg = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
  const cvcReg = /^[0-9]{3}$/;
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const [state, actions] = useCounter();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expireDate: '',
    cvc: '',
    ownerName: '',
  });

  const handlerInput = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setCardData({ ...cardData, [name]: value });
  };

  const onEnterSubmit = (e) => {
    if (e.keyCode === 13) {
      handlerInput(e);
    }
  };

  const pay = () => {
    const formatBack = new RegExp(/\s+|[,/]/g);
    if (
      numberReg.test(cardData.cardNumber.split(formatBack).join('')) &&
      dateReg.test(cardData.expireDate) &&
      cvcReg.test(cardData.cvc) &&
      cardData.ownerName.length > 5
    ) {
      fetch('/api/payCard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creditsAdd: state.count,
          totalPrice: state.totalPriceState,
        }),
      });
      setLoading(true);
      setMessage({ correct: true });
      setIsOpen(false);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setTimeout(() => {
        history.push('/user-panel');
      }, 4000);
    } else {
      setMessage({ message: 'Something went wrong please check your data and try again ' });
      setIsOpen(true);
    }
  };

  const formatCard = (e) => {
    const target = e.target;
    switch (e.target.name) {
      case 'cardNumber':
        let position = target.selectionEnd;
        let length = target.value.length;

        target.value = target.value
          .replace(/[^\dA-Z]/g, '')
          .replace(/(.{4})/g, '$1 ')
          .trim();

        target.selectionEnd = position +=
          target.value.charAt(position - 1) === ' ' &&
          target.value.charAt(length - 1) === ' ' &&
          length !== target.value.length
            ? 1
            : 0;

        break;
      case 'expireDate':
        if (!/^\d{0,2}\/?\d{0,2}$/.test(e.target.value)) {
          return;
        }
        if (/^\d{3,}$/.test(target.value)) {
          target.value = target.value
            .match(new RegExp('.{1,2}', 'g'))
            .join('/');
        }
        break;
      default:
        return;
    }
  };

  return (
    <div id="top__component">
      {loading && <BasicLoadingAni />}
      {!loading && (
        <div className="popup-relative">
          <HamburgerTop />
          <main
            style={
              message.correct
                ? { filter: 'blur(3px)' }
                : { filter: 'blur(0px)' }
            }
            className="payment__wrap"
          >
            <h2 className="heading-2">Provide credit card details</h2>
            <section
              className="payment__finish  "
              onKeyUp={(e) => onEnterSubmit(e)}
            >
              <label className="payment__cardLabel ">
                <p className="payment__labelTitle">Card number: </p>
                <i className="payment__icon" style={{ top: '4rem' }}>
                  {CreditCard}
                </i>
                <input
                  className="payment__cardInput"
                  placeholder="1234-1234-1234-1234"
                  name="cardNumber"
                  maxLength="19"
                  value={cardData.cardNumber}
                  onChange={(e) => {
                    formatCard(e);
                    handlerInput(e);
                  }}
                  type="text"
                  autoComplete="cc-number"
                  inputMode="numeric"
                />
              </label>
              <label className="payment__cardLabel ">
                <p className="payment__labelTitle">Owner Name:</p>
                <i className="payment__icon" style={{ top: '3.8rem' }}>
                  {Profile}
                </i>
                <input
                  className="payment__cardInput"
                  type="text"
                  placeholder="Card owner name"
                  name="ownerName"
                  inputMode="text"
                  value={cardData.ownerName}
                  onChange={(e) => {
                    handlerInput(e);
                  }}
                />
              </label>
              <CardCVCDate>
                <Cardinfo width={'28%'}>
                  <p className="payment__labelTitle">Date</p>
                  <i className="payment__icon" style={{ top: '3.5rem' }}>
                    {Calendar}
                  </i>
                  <input
                    autoComplete="cc-exp"
                    className="payment__cardInput"
                    name="expireDate"
                    placeholder="22/21"
                    maxLength="5"
                    value={cardData.expireDate}
                    onChange={(e) => {
                      formatCard(e);
                      handlerInput(e);
                    }}
                  />
                </Cardinfo>
                <Cardinfo width={'23%'}>
                  <p className="payment__labelTitle">CVC</p>
                  <i className="payment__icon" style={{ top: '3.6rem' }}>
                    {Lock}
                  </i>
                  <input
                    className="payment__cardInput"
                    name="cvc"
                    maxLength="4"
                    placeholder="323"
                    autoComplete="cc-csc"
                    inputMode="numeric"
                    value={cardData.cvc}
                    onChange={(e) => handlerInput(e)}
                    type="password"
                  />
                </Cardinfo>
              </CardCVCDate>

              <button
                className="heading__btn"
                style={{
                  width: '40%',
                  marginRight: '0',
                  marginLeft: 'auto',
                  marginBottom: '1rem',
                  display: 'block',
                  marginTop: '5rem',
                }}
                onClick={pay}
              >
                Pay Now
              </button>
            </section>
            <Footer />
          </main>
          {message.correct && !loading && (
            <Popup
              title="You successful added credits"
              message="You will be redirect to dashboard"
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
                      <path d="M19 16.166c0-4.289-4.465-5.483-7.887-7.091-2.079-1.079-1.816-3.658 1.162-3.832 1.652-.1 3.351.39 4.886.929l.724-3.295c-1.814-.551-3.437-.803-4.885-.841v-2.036h-2v2.134c-3.89.535-5.968 2.975-5.968 5.7 0 4.876 5.693 5.62 7.556 6.487 2.54 1.136 2.07 3.5-.229 4.021-1.993.451-4.538-.337-6.45-1.079l-.909 3.288c1.787.923 3.931 1.417 6 1.453v1.996h2v-2.105c3.313-.464 6.005-2.293 6-5.729z" />
                    </svg>
                  </div>
                </Link>
              }
              position={true}
            />
          )}

          {isOpen && (
            <Warning setIsOpen={setIsOpen} errorMessage={message.message} />
          )}
        </div>
      )}
      {!loading && <MenuBottom />}
    </div>
  );
};

export default Payments;
