import React from 'react';
import Card from './Card';
import Footer from '../page/Footer';
import { useCounter, CounterSubscriber } from '../../store/sub';
import HamburgerTop from '../Hamburger/HamburgerTop';
import MenuBottom from '../Hamburger/MenuBottom';

const Subscriptions = () => {
  const [state, actions] = useCounter();

  return (
    <>
      <HamburgerTop onAdd={state.load} />
      <div className="subscription_cards">
        <h1 className="section__title">Choose your preferable plan</h1>
        <div className="subscrition__card--wrapper">
          <Card
            title={'Basic'}
            price={{
              roundedPrice: '4',
              afterComma: '99',
            }}
            totalPrice={'4.99'}
            creditsQuantity={5}
            description={{
              row1: '5 Credits',
              row2: 'Dark Theme',
              row3: '30 days money back Guarantee',
            }}
            className={'card__normal'}
            recomendation={false}
          />
          <Card
            title={'Standard'}
            price={{
              roundedPrice: '9',
              afterComma: '99',
            }}
            totalPrice={'9.99'}
            creditsQuantity={15}
            description={{
              row1: '15 Credits',
              row2: 'Dark Theme',
              row3: '30 days money back Guarantee',
            }}
            className={'card__normal card__normal--highlighted'}
            recomendation={true}
          />
          <Card
            title={'Premium'}
            price={{
              roundedPrice: '19',
              afterComma: '99',
            }}
            totalPrice={'19.99'}
            creditsQuantity={35}
            description={{
              row1: '35 Credits',
              row2: 'Dark Theme',
              row3: '30 days money back Guarantee',
            }}
            className={'card__normal'}
            recomendation={false}
          />
        </div>
      </div>
      <Footer />
      <MenuBottom />
    </>
  );
};

export default Subscriptions;
