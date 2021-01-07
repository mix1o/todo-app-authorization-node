import React, { useState } from 'react';

const ResetPasswordForm = () => {
  const [passwordVis, setPasswordVis] = useState('password');
  const [isVisible, setIsVisible] = useState(true);

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
    <main className="reset__password">
      <form className="rest__passwordForm" name="reset password form">
        <label className="passwordForm__email">
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
        <label className="passwordForm__password">
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
        <label className="passwordForm__password--confirm">
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
              setIsVisible(false);
            } else {
              setPasswordVis('password');
              setIsVisible(true);
            }
          }}
        ></p>
      </form>

      <section>
        <button onClick={resetPassword} className="section__reset--btn">
          Reset
        </button>
      </section>
      <p className="section__message">{message}</p>
    </main>
  );
};

export default ResetPasswordForm;
