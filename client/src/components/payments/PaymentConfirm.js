import React from 'react';
import Footer from '../page/Footer';
import { useCounter } from '../../store/sub';
import { Link } from 'react-router-dom';
import { svgIcon } from './paymentssvg';
import HamburgerTop from '../Hamburger/HamburgerTop';
import MenuBottom from '../Hamburger/MenuBottom';

const PaymentConfirm = () => {
  const [state, actions] = useCounter();

  return (
    <div id="top__component">
      <HamburgerTop />
      <div className="payment__wrap">
        <h2 className="heading-2">Confrim order and proceed to checkout</h2>
        <main className="payment__details">
          <h3 className="heading-3">Order details: </h3>
          <div style={{ marginTop: '3rem' }} className="payment__div">
            {svgIcon}
            <p className="payment__p">
              Plan: <span style={{ fontWeight: '900' }}>{state.titleSub}</span>
            </p>
          </div>
          <div className="payment__div">
            {svgIcon}
            <p className="payment__p">
              Credits:
              <span style={{ fontWeight: '900' }}>{state.creditsSub}</span>
            </p>
          </div>
          <div className="payment__div">
            {svgIcon}
            <p className="payment__p">
              You can refund your purchase for
              <span style={{ fontWeight: '900' }}>30 days</span> after buying it
            </p>
          </div>
          <div className="payment__div">
            {svgIcon}
            <p className="payment__p">
              Total to pay included <br />
              VAT &#40;23%&#41;
              <span style={{ fontWeight: '900' }}>${state.count}</span>
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Link
              style={{ marginBottom: '1rem' }}
              className="heading__btn"
              to="/method-payment"
            >
              Next
            </Link>
          </div>
        </main>
      </div>
      <Footer />
      <MenuBottom />
    </div>
  );
};

export default PaymentConfirm;
