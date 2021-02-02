import React from 'react';
import HamburgerTop from '../Hamburger/HamburgerTop';
import Header from '../page/Header';
import Footer from './Footer';

const Terms = () => {
  return (
    <>
      <HamburgerTop />
      <main className="terms">
        <h1 className="section__title">Term of sevice</h1>
        <p className="main__info">
          This Terms of Service <strong>(the “Terms”)</strong> describes the
          rights and responsibilities that apply to your use of
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
