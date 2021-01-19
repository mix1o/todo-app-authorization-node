import React from 'react';
import Header from '../page/Header';
import Card from './Card';
import Footer from '../page/Footer';
import { useCounter } from '../../store/sub';


const Subscriptions = () => {

  const [state,actions] = useCounter();

  return (
    <>
      <Header onAdd={state.load}/>
      <main className="subscription_cards" style={{background: 'aqua'}}>
        <h1 className="section__title">Choose your preferable plan</h1>
        <Card
          title={'Basic'}
          price={{
            roundedPrice: '4',
            afterComma: '99',
          }}
          priceFull={'4.99'}
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
          priceFull={'9.99'}
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
          priceFull={'19.99'}
          description={{
            row1: '35 Credits',
            row2: 'Dark Theme',
            row3: '30 days money back Guarantee',
          }}
          className={'card__normal'}
          recomendation={false}
        />
      </main>
      <Footer />
     
    </>
  );
};

export default Subscriptions;
