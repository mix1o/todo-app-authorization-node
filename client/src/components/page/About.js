import React from 'react';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import HamburgerTop from '../Hamburger/HamburgerTop';

const About = () => {
  return (
    <>
      <HamburgerTop />
      <main className="about terms">
        <section className="about__topSeciton">
          <h1 className="section__title">About</h1>
          <p className="main__info">
            <strong>nmTasks </strong> helps you with organizing your daily tasks
            and encourages you to complete them before the day ends.
          </p>
        </section>
        <section>
          <h2 className="section__title">Different approach</h2>
          <p className="main__info">
            We belive that people when they have something important to lose
            they will do everything they can to prevent it from happening.
            That's why we decided to add credit base system to our app, that way
            if you don't complete your task you will lose your credit and the
            only way to get credits back is by buying it from our
            <Link to="/" className="about__link--store">
              <strong className="label__span--link"> store </strong>
            </Link>
            or completing task before end of the day.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
