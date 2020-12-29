import React, { useState } from 'react';

const ResetPasswordForm = () => {
  const [userEmail, setEmail] = useState('');
  const [userNewPassword, setUserNewPassword] = useState('');
  const [passwordVis, setPasswordVis] = useState('password');

  const [userData, setUserData] = useState({
    Email: '',
    NewPassword: '',
    ConfirmNewPassword: '',
  });

  const handlerInput = (event) => {
    const target = event.target;
    const value = event.target.value;
    const name = target.name;

    setUserData({ ...userData, [name]: value });
  };

  const [message, setMessage] = useState('');

  const resetPassword = () => {
    fetch('/api/resetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((json) => setMessage(json.message));
  };

  return (
    <section className="section__reset--password">
      <label className="label__reset">
        <p className="label__paragraph">E-mail: </p>
        <input
          className="label__input label__input--email"
          type="email"
          name="Email"
          placeholder="Your E-mail"
          required
          value={userData.Email}
          onChange={(e) => handlerInput(e)}
        />
      </label>
      <label className="label__reset">
        <p className="label__paragraph">New Password: </p>
        <input
          className="label__input label__input--password"
          type={passwordVis}
          placeholder="New password"
          name="NewPassword"
          required
          value={userData.NewPassword}
          onChange={(e) => handlerInput(e)}
        />
      </label>
      <label className="label__reset">
        <p className="label__paragraph">Confirm New Password: </p>
        <input
          className="label__input label__input--password"
          type={passwordVis}
          placeholder="New password"
          required
          name="ConfirmNewPassword"
          value={userData.ConfirmNewPassword}
          onChange={(e) => handlerInput(e)}
        />
      </label>
      <p
        onClick={() => {
          if (passwordVis === 'password') {
            setPasswordVis('text');
          } else {
            setPasswordVis('password');
          }
        }}
      >
        See password
      </p>
      <button onClick={resetPassword} className="section__reset--btn">
        Reset
      </button>
      <p className="section__message">{message}</p>
    </section>
  );
};

export default ResetPasswordForm;
