import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <main className="main__notFound">
        <section className="section__notFound">
          <p className="notFound__404">404</p>
          <h1 className="notFound__title">Yabe! Your're lost.</h1>
          <p className="notFound__paragraph">
            The page your looking for doesn’t exist. But don’t worry you can
            click button below to go back to the homepage
          </p>
        </section>
        <Link to="/">
          <button className="btn__main--full btn__notFound">Home</button>
        </Link>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
