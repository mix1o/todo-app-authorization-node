import React from 'react';
import Header from './Header';
import Footer from './Footer';

const About = () => {
  return (
    <>
      <Header />
      <main className="terms">
        <h1 className="main__header">About</h1>
        <p className="main__info"></p>
      </main>
      <Footer />
    </>
  );
};

export default About;
