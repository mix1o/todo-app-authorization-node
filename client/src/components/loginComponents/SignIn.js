import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ToggleEye from './ToggleEye';

const SignIn = () => {
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState({
    Email: '',
    Password: '',
  });
  const [passwordVis, setPasswordVis] = useState('password');
  const [isVisible, setIsVisible] = useState(true);
  const [correct, setCorrect] = useState(false);
  const history = useHistory();
  const handlerInput = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setUserData({ ...userData, [name]: value });
  };
  const hanlderSign = (e) => {
    // e.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((json) => {
        setMessage(json);
        if (json.correct) {
          history.push('/user-panel');
        }
      });
  };

  return (
    <section className="section__signIn ">
      <h2 className="section__header">Sign In</h2>
      <div className="section__formWrapper">
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
            value={userData.name}
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
          <p className="section__message section__message--signin">
            {message.message}
          </p>
        </label>
      </div>
      <div className="section__buttons">
        <button
          onClick={(e) => hanlderSign(e)}
          className="signIn__btn btn__main--full "
        >
          Login
        </button>
      </div>
    </section>
  );
};

export default SignIn;
