import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { CounterSubscriber, useCounter } from '../../store/sub';
import HamburgerTop from '../Hamburger/HamburgerTop';
import { useHistory } from 'react-router-dom';
import EditPopup from '../loginComponents/EditPopup';
import { ConverDate } from '../../functions/ConvertDate';
import MenuBottom from '../Hamburger/MenuBottom';

const Settings = () => {
  const [state, actions] = useCounter();
  const [cor, setCor] = useState(false);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [password, setPassword] = useState('');
  const [editDataType, setEditDataType] = useState('');
  const history = useHistory();

  const loadUser = () => {
    fetch('/api/userpanel')
      .then((res) => res.json())
      .then((json) => {
        if (json.correct) {
          actions.user(json);
          setCor(true);
        }
      });
  };

  const deleteAccount = () => {
    fetch('/api/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.correct) {
          history.push('/');
          window.location.reload();
        } else {
          setMessage(json.message);
        }
      });
  };

  const updateData = (data, index) => {
    fetch('/api/editData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, index }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.correct) {
          loadUser();
          setTimeout(() => {
            setOpen(false);
          }, 2000);
        }
        setMessage(json);
      });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const dateOutput = ConverDate(new Date(state.userData.user[0].createdDate));

  const openEdit = (argument) => {
    setOpen(true);
    setEditDataType(argument);
  };

  return (
    <div className="popup-relative">
      <HamburgerTop blur={openDelete || open} />
      {open && (
        <EditPopup
          message={message}
          setMessage={setMessage}
          editDataType={editDataType}
          updateData={updateData}
          setOpen={setOpen}
        />
      )}
      {openDelete && (
        <section className="settings__deletePopup">
          <div className="settings__header">
            <p className="settings__passParagraph">Type your password:</p>
            <i
              className="settings__closeIcon"
              onClick={() => {
                setOpenDelete(false);
                setMessage('');
                setPassword('');
              }}
            >
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 2.91667C25.5413 2.91667 32.0833 9.45875 32.0833 17.5C32.0833 25.5413 25.5413 32.0833 17.5 32.0833C9.45875 32.0833 2.91667 25.5413 2.91667 17.5C2.91667 9.45875 9.45875 2.91667 17.5 2.91667ZM17.5 0C7.83563 0 0 7.83563 0 17.5C0 27.1644 7.83563 35 17.5 35C27.1644 35 35 27.1644 35 17.5C35 7.83563 27.1644 0 17.5 0ZM26.25 24.1179L19.5533 17.4854L26.1829 10.796L24.1179 8.75L17.4898 15.4423L10.799 8.81708L8.75 10.866L15.4481 17.5044L8.81708 24.201L10.866 26.25L17.5087 19.5475L24.204 26.1829L26.25 24.1179Z"
                  fill="var(--header-color)"
                />
              </svg>
            </i>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            aria-label="password"
            placeholder="Password"
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                deleteAccount();
              }
            }}
          />

          <p
            style={{
              color: 'var(--hamburger-bars-bg)',
              margin: '.5rem 0',
              fontSize: '1.2rem',
            }}
          >
            After confirming all your data will be pernamently wiped out
          </p>
          <span
            style={{
              fontSize: '1.5rem',
              color: 'var(--red)',
              fontWeight: '700',
            }}
          >
            {message}
          </span>
          <button
            className="settings__button__delete"
            style={{
              backgroundColor: 'var(--red)',
              color: 'var(--white)',
              boxShadow: 'none',
              margin: '2.5rem 0 1rem 0',
            }}
            onClick={() => deleteAccount()}
          >
            Confirm Deletation
          </button>
        </section>
      )}
      <div
        style={
          open || openDelete ? { filter: 'blur(3px)' } : { filter: 'blur(0)' }
        }
        className="settings__main"
      >
        <h2 className="heading-2">Settings</h2>
        <div className="settings__section">
          {state.correct && (
            <p>
              You are member since
              <span
                style={{
                  fontWeight: '700',
                  marginLeft: '1rem',
                  fontSize: '1.6rem',
                  color: 'var(--header-color)',
                }}
              >
                {dateOutput.dateAdded}
              </span>
            </p>
          )}
        </div>
        <div className="settings__section">
          <h4>Personal information</h4>
          <div>
            {state.correct && (
              <div className="info__user__settings">
                <span>Nickname:</span>
                <span className="width__span">
                  {state.userData.user[0].name}
                </span>
                <span
                  onClick={() => {
                    openEdit('nickname');
                  }}
                  className="settings__edit__button"
                >
                  Edit
                </span>
              </div>
            )}
          </div>
          <div>
            {state.correct && (
              <div className="info__user__settings">
                <span>Email:</span>
                <span className="width__span">
                  {state.userData.user[0].email}
                </span>
                <span
                  onClick={() => {
                    openEdit('email');
                  }}
                  className="settings__edit__button"
                >
                  Edit
                </span>
              </div>
            )}
          </div>
          <div>
            {state.correct && (
              <div className="info__user__settings">
                <span>Password:</span>
                <span className="width__span">******</span>
                <span
                  onClick={() => {
                    openEdit('password');
                  }}
                  className="settings__edit__button"
                >
                  Edit
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="settings__section">
          <h4>Theme</h4>
          <div style={{ fontSize: '1.3rem', color: 'var(--header-color)' }}>
            <p>Only light theme available for now</p>
            <p>We are working for a dark theme</p>
          </div>
        </div>
        <div className="settings__section">
          <div>
            <button
              style={open ? { pointerEvents: 'none' } : {}}
              onClick={() => setOpenDelete(true)}
              className="settings__button__delete"
            >
              Delete my mnTasks account
            </button>
            <p
              style={{
                fontSize: '1.4rem',
                fontWeight: '300',
                marginTop: '2rem',
              }}
            >
              Deleting your account is permanent. All your data will be wiped
              out immediately and you won't be able to get it back. Requires
              password.
            </p>
          </div>
        </div>
      </div>
      <Footer />
      <MenuBottom />
    </div>
  );
};

export default Settings;
