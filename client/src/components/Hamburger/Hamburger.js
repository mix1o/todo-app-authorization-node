import { useCookies } from 'react-cookie';
import { useCounter } from '../../store/sub';
import { STEPSBURGER } from '../Guide/Steps';
import { Link, useHistory } from 'react-router-dom';
import { home, logOutIcon, search } from './HamburgerIcons';
import React, { useEffect, useState } from 'react';
import Tour from '../Guide/Tour';
import styled from 'styled-components';
import TasksFound from './TasksFound';
import ListHamburger from './ListHamburger';
import BasicLoadingAni from '../animation/BasicLoadingAni';
import { motion, AnimatePresence } from 'framer-motion';

const HamburgerDiv = styled(motion.div)`
  position: fixed;
  height: 100vh;
  top: 0;
  bottom: 0;
  width: 100%;
  background: var(--header-color);
  z-index: 6;
`;

const Hamburger = ({ isOpen, setIsOpen }) => {
  const [state, actions] = useCounter();
  const history = useHistory();
  const [content, setContent] = useState('');
  const [clicked, setClicked] = useState(false);
  const [results, setResults] = useState([]);
  const [areResult, setAreResult] = useState(false);
  const [helpContent, setHelpContent] = useState('');
  const [cookies] = useCookies({});
  const { user } = cookies;

  const searchUserData = () => {
    setHelpContent(content);
    fetch('/api/searchContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })
      .then((res) => res.json())
      .then((json) => {
        setResults(json);
      });
  };

  const singOut = () => {
    fetch('/api/signOut', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      history.push('/');
      window.location.reload();
    });
  };

  useEffect(() => {
    fetch('/api/userpanel')
      .then((res) => res.json())
      .then((json) => {
        if (json.correct) {
          actions.user(json);
        }
      });
  }, []);

  const unCompletedTasks = results.filter(
    (item) => item.complete !== 'Completed'
  );
  const completedTasks = results.filter(
    (item) => item.complete === 'Completed'
  );

  const [loading, setLoading] = useState(true);

  if (areResult) {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }

  return (
    <div style={{ position: 'relative' }}>
      {user.newUser && isOpen && <Tour open={true} steps={STEPSBURGER} />}

      {isOpen && (
        <HamburgerDiv isOpen={isOpen}>
          {/* {areResult && loading && <BasicLoadingAni />} */}
          <div className="actions">
            <div></div>
            <p>
              <span>mn</span>
              Tasks
            </p>
            <div></div>
          </div>
          {!clicked && (
            <div className="hamburger__info">
              <p style={{ fontWeight: '100', fontSize: '3.2rem' }}>Hello !</p>
              <p
                style={{
                  fontWeight: '700',
                  letterSpacing: '3px',
                  marginTop: '-1rem',
                }}
              >
                {state.correct && state.userData.user[0].name}
              </p>
            </div>
          )}
          <div className="hamburger__div__input">
            <div
              onClick={() => {
                searchUserData();
                setAreResult(true);
                setLoading(true);
              }}
              style={{ position: 'absolute', top: '10px', left: '10px' }}
            >
              {search}
            </div>
            <input
              placeholder="What do you need?"
              className="hamburger__input"
              aria-label="search"
              type="text"
              value={content}
              style={clicked ? { width: '80%' } : { width: '100%' }}
              onClick={() => setClicked(true)}
              onChange={(e) => setContent(e.target.value)}
            />
            {clicked && (
              <button
                className="hamburger__cancel"
                aria-label="cancel search"
                onClick={() => {
                  setClicked(false);
                  setContent('');
                  setResults([]);
                  setAreResult(false);
                  setLoading(true);
                }}
              >
                Cancel
              </button>
            )}
          </div>

          {clicked && (
            <div className="container__found__tasks">
              <TasksFound
                content={helpContent}
                searchUserData={searchUserData}
                completedTasks={completedTasks}
                unCompletedTasks={unCompletedTasks}
                areResult={areResult}
                results={results}
              />
            </div>
          )}

          {!clicked && (
            <div>
              <div className="credits">
                <p>
                  Your credits:
                  <span>
                    {' '}
                    {state.correct && state.userData.user[0].credits}
                  </span>
                </p>
              </div>
              <ListHamburger open={isOpen} />
              <div onClick={() => singOut()} className="log__out">
                {logOutIcon}
              </div>
            </div>
          )}
          <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
            <Link onClick={() => setIsOpen(false)} to="/user-panel">
              {home}
            </Link>
          </div>
        </HamburgerDiv>
      )}
    </div>
  );
};

export default Hamburger;
