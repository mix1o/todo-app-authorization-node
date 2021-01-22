import React, { useState } from 'react';
import Header from '../page/Header';
import Footer from '../page/Footer';
import {useCounter} from '../../store/sub';
import {Link} from 'react-router-dom'
import {one,two,tree,four} from './paymentssvg';
const PaymentMethod = () => {

    const [select,setSelected] = useState(false);

  return (
    <>
      <Header />
      <div className="payment__wrap">
          <h2 className="heading-2">Finish the payment</h2>
          <div className="payment__details">
              <h3 style={{marginTop: '0'}} className="heading-3">Payment method</h3>
              <div className="payment__method">
                <div onClick={() => setSelected(true)} className="payment__single">
                    <button className="selectedGreen">
                        {one}
                    </button>
                </div>
                <div className="payment__single">
                    <button>
                        {two}
                    </button>
                </div>
              </div>
              <div className="payment__method">
              <div className="payment__single">
                    <button>
                        {tree}
                    </button>
                </div>
                <div className="payment__single">
                    <button>
                        {four}
                    </button>
                </div>
              </div>
              <div style={{textAlign: 'center',marginTop: '3rem', fontSize: '1.4rem'}}>
                <p style={{fontWeight: '700'}}>Why credit or debit card is selected?</p>
                <p style={{marginTop: '1.5rem'}}>We are working for add new method payment</p>
              </div>
              <div style={{textAlign: 'right'}}>
            <Link style={{marginBottom: '1rem'}} className="heading__btn" to="/pay-now">
              Next
            </Link>
          </div>
          </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentMethod;
