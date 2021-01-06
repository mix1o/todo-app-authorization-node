import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ToggleEye from './ToggleEye';
import styled from 'styled-components';

const RegisterationForm = () => {
  const [userData, setUserData] = useState({
    Firstname: '',
    Lastname: '',
    Email: '',
    Password: '',
  });
  const [catchError, setCatchError] = useState('');
  const [passwordVis, setPasswordVis] = useState('password');
  const [isVisible, setIsVisible] = useState(true);

  const handlerInput = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setUserData({ ...userData, [name]: value });
  };

  const registration = () => {
    fetch('/api/newuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      // .then((json) => setCatchError(json));
      .then((json) => setCatchError(json));

    // console.log(userData);
  };
  return (
    <main className="section__signUp">
      <h1 className="section__header">Create Account</h1>
      <form className="section__formWrapper" name="sign up form">
        <label className="signUp__label--firstname form__label">
          <p className="label__paragraph">First Name: </p>
          <input
            className="label__input label__input--name"
            type="text"
            name="Firstname"
            placeholder="First Name"
            value={userData.Firstname}
            onChange={(e) => handlerInput(e)}
          />
        </label>

        <label className="signUp__label--lastname form__label ">
          <p className="label__paragraph">Last Name: </p>
          <input
            className="label__input label__input--surrname"
            type="text"
            name="Lastname"
            placeholder="Last Name"
            value={userData.Lastname}
            onChange={(e) => handlerInput(e)}
          />
        </label>
        <label className="signUp__label--email form__label">
          <p className="label__paragraph">E-mail address:</p>
          <input
            className="label__input label__input--email"
            type="email"
            name="Email"
            placeholder="Your e-mail  address"
            required
            value={userData.Email}
            onChange={(e) => handlerInput(e)}
          />
        </label>
        <label className="signUp__label--password form__label">
          <p className="label__paragraph">Password: </p>
          <input
            className="label__input label__input--password"
            type={passwordVis}
            name="Password"
            placeholder="Password"
            value={userData.Password}
            onChange={(e) => handlerInput(e)}
          />
          <p
            onClick={() => {
              if (passwordVis === 'password') {
                setPasswordVis('text');
                setIsVisible(false);
              } else {
                setPasswordVis('password');
                setIsVisible(true);
              }
            }}
          >
            <ToggleEye isVisible={isVisible} />
          </p>
        </label>
        <label className="form__label form__checkbox">
          <input type="checkbox" required className="label__checkbox" />
          <span className="checkbox__indicator"></span>

          <p className="label__terms">
            I agree to the
            <Link className="label__link" to="/">
              <span className="label__tearms label__span--link">Terms</span>
            </Link>
            and
            <Link className="label__link" to="/">
              <span className="label__policy label__span--link">
                Privacy Policy.
              </span>
            </Link>
          </p>
          <p className="section__message">{catchError.message}</p>
        </label>
      </form>
      <section className="section__buttons ">
        <Link to="/login">
          <button className="signIn__btn btn__main--empty">Sign In</button>
        </Link>
        <button className="signUp__btn btn__main--full" onClick={registration}>
          Sign Up
        </button>
      </section>
    </main>
  );
};

export default RegisterationForm;
