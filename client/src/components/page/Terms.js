import React from 'react';
import Header from '../page/Header';
import Footer from './Footer';

const Terms = () => {
  return (
    <>
      <Header />
      <main className="terms">
        <h1 className="main__header">Term of sevice</h1>
        <p className="main__info">
          This Terms of Service <strong>(the “Terms”)</strong> describes the
          rights and responsibilities that apply to your use of{' '}
          <span className="label__tearms label__span--link">
            <strong>nmTasks </strong>
          </span>
          websites, services.
        </p>
      </main>
      <Footer />
    </>
  );
};

export default Terms;
