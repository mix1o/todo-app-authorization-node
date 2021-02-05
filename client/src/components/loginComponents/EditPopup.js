import React, { useState } from 'react';
import { close } from '../Hamburger/HamburgerIcons';

const EditPopup = ({
  setMessage,
  editDataType,
  updateData,
  setOpen,
  message,
}) => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (message.correct) {
    setTimeout(() => {
      setMessage('');
    }, 2000);
  }
  return (
    <div className="settings__edit__div">
      <div style={{ textAlign: 'right' }}>
        <div
          className="setting__closIcon"
          onClick={() => {
            setOpen(false);
            setMessage('');
          }}
        >
          {close}
        </div>
      </div>
      {editDataType === 'nickname' && (
        <>
          <h3 className="heading-3">Edit your nickname</h3>
          <label className="form__label">
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              type="text"
              className="label__input"
              style={{ width: '100%', margin: '2rem 0' }}
              placeholder="New nickname"
            />
          </label>
          <div>
            <button
              onClick={() => updateData(nickname, 'nickname')}
              className="btn__main--full"
              style={{ margin: '1rem 0 1rem 0' }}
            >
              Change{' '}
            </button>
          </div>
        </>
      )}
      {editDataType === 'email' && (
        <>
          <h3 className="heading-3">Edit your new email</h3>
          <label className="form__label">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="label__input"
              placeholder="example@task.com"
              style={{ width: '100%', margin: '2rem 0' }}
            />
          </label>
          <div>
            <button
              onClick={() => updateData(email, 'email')}
              className="btn__main--full"
              style={{ margin: '1rem 0 1rem 0' }}
            >
              Change Now
            </button>
          </div>
        </>
      )}
      {editDataType === 'password' && (
        <>
          <h3 className="heading-3">Edit your password</h3>
          <label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="New password"
              className="label__input"
              style={{ width: '100%', margin: '2rem 0' }}
            />
          </label>
          <div>
            <button
              onClick={() => updateData(password, 'password')}
              className="btn__main--full"
              style={{ margin: '1rem 0 1rem 0' }}
            >
              Change Noww
            </button>
          </div>
        </>
      )}
      <p
        style={{ textAlign: 'center', fontSize: '1.4rem', margin: '1rem 0' }}
        className={`${message.correct ? 'green-color-p' : 'red-color-p'}`}
      >
        {message.message}
      </p>
    </div>
  );
};

export default EditPopup;
