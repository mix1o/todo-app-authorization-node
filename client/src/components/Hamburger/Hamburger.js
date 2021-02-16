import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCookies } from 'react-cookie';
import { useCounter } from '../../store/sub';
import { STEPSBURGER } from '../Guide/Steps';
import { Link, useHistory } from 'react-router-dom';
import { hamburgerVariants } from '../animation/SlidInOut';
import { home, logOutIcon, search } from './HamburgerIcons';
import { SlidInContainer } from '../animation/MountTransition';
import { SlidInPresence, SlidInItems } from '../animation/PageTransitions';
import Tour from '../Guide/Tour';
import styled from 'styled-components';
import TasksFound from './TasksFound';
import ListHamburger from './ListHamburger';

const HamburgerDiv = styled(motion.div)`
  position: absolute;
  height: 100vh;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--header-color);
  z-index: 6;
  overflow-y: scroll;
`;

const Hamburger = ({ isOpen, setIsOpen }) => {
  const history = useHistory();
  const [state, actions] = useCounter();
  const [content, setContent] = useState('');
  const [helpContent, setHelpContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [areResult, setAreResult] = useState(false);
  const [results, setResults] = useState([]);
  const [cookies] = useCookies({});
  const { user } = cookies;
  const [isNew, setIsNew] = useState(false);

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
          setIsNew(true);
        }
      });
  }, []);

  const unCompletedTasks = results.filter(
    (item) => item.complete !== 'Completed'
  );
  const completedTasks = results.filter(
    (item) => item.complete === 'Completed'
  );

  if (areResult) {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }
  return (
    <div style={{ position: 'relative' }}>
      {isNew && state.userData.user[0].newUser && isOpen && (
        <Tour open={true} steps={STEPSBURGER} />
      )}
      <SlidInPresence>
        {isOpen && (
          <HamburgerDiv
            variants={hamburgerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <SlidInContainer>
              <SlidInItems>
                <div className="actions">
                  <div></div>
                  <p>
                    <span>mn</span>
                    Tasks
                  </p>
                  <div></div>
                </div>
              </SlidInItems>
              <SlidInItems>
                {!clicked && (
                  <div className="hamburger__info">
                    <p style={{ fontWeight: '100', fontSize: '3.2rem' }}>
                      Hello !
                    </p>
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
              </SlidInItems>
              <SlidInItems>
                <div className="hamburger__div__input">
                  <div
                    className="hamburger__div__input-child"
                    onClick={() => {
                      searchUserData();
                      setAreResult(true);
                      setLoading(true);
                    }}
                   
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
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        searchUserData();
                        setAreResult(true);
                        setLoading(true);
                      }
                    }}
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
              </SlidInItems>
              <SlidInItems>
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
              </SlidInItems>
              {!clicked && (
                <div>
                  <SlidInItems>
                    <div className="credits">
                      <p>
                        Your credits:
                        <span>
                          {state.correct && state.userData.user[0].credits}
                        </span>
                      </p>
                    </div>
                  </SlidInItems>
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
            </SlidInContainer>
          </HamburgerDiv>
        )}
      </SlidInPresence>
    </div>
  );
};

export default Hamburger;
