import React from 'react';
import Header from './Header';
import Footer from './Footer';

const ContactUs = () => {
  return (
    <>
      <Header />
      <main className="contactUs">
        <h1 className="section__title">Get in touch</h1>
        <section className="contact__section">
          <form
            className="section__formWrapper"
            name="Get in touch with us form"
          >
            <label className="form__label">
              <p className="label__paragraph">Name:</p>
              <input
                className="label__input"
                type="email"
                placeholder="Your name or alias"
                required
              />
            </label>
            <label className="form__label">
              <p className="label__paragraph">Email:</p>
              <input
                className="label__input"
                type="email"
                placeholder="Your email address"
                required
              />
            </label>
            <label className="form__label">
              <p className="label__paragraph">Message:</p>
              <textarea
                className="label__textarea"
                placeholder="Remember, be nice!"
                name="message"
                cols="30"
                rows="10"
              ></textarea>
            </label>
            <button className="btn__main--full contact__btnSend">
              Send Message
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactUs;
