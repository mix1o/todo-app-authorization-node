import React from 'react';
import Header from '../page/Header';
import Footer from '../page/Footer';

const PaymentConfirm = () => {
  return (
    <>
      <Header />
      <div className="payment__wrap">
        <h2 className="heading-2">Confrim order and proceed to checkout</h2>
      </div>
      <Footer />
    </>
  );
};

export default PaymentConfirm;
