import React, { useState } from 'react';
import { close } from '../Hamburger/HamburgerIcons';
import { motion } from 'framer-motion';
import { mountVariants } from '../animation/SlidInOut';

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
    <motion.div
      variants={mountVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="settings__edit__div"
    >
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
          <label style={{ textAlign: 'center', display: 'block' }}>
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              type="text"
              className="label__input label__input--password"
              placeholder="New nickname"
              style={{ margin: '2rem auto' }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  updateData(nickname, 'nickname');
                }
              }}
            />
          </label>
          <div>
            <button
              onClick={() => updateData(nickname, 'nickname')}
              className="btn__main--full button__change"
            >
              Change
            </button>
          </div>
        </>
      )}
      {editDataType === 'email' && (
        <>
          <h3 className="heading-3">Edit your new email</h3>
          <label style={{ textAlign: 'center', display: 'block' }}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="label__input"
              style={{ margin: '2rem auto' }}
              placeholder="example@task.com"
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  updateData(email, 'email');
                }
              }}
            />
          </label>
          <div>
            <button
              onClick={() => updateData(email, 'email')}
              className="btn__main--full button__change"
            >
              Change Now
            </button>
          </div>
        </>
      )}
      {editDataType === 'password' && (
        <>
          <h3 className="heading-3">Edit your password</h3>
          <label style={{ textAlign: 'center', display: 'block' }}>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="New password"
              className="label__input label__editPopup"
              style={{ margin: '2rem 0' }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  updateData(password, 'password');
                }
              }}
            />
          </label>
          <div>
            <button
              onClick={() => updateData(password, 'password')}
              className="btn__main--full button__change"
            >
              Change Now
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
    </motion.div>
  );
};

export default EditPopup;
