import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ListHamburger from './ListHamburger';
import { useCookies } from 'react-cookie';
import { useCounter } from '../../store/sub';
import Tour from '../Guide/Tour';
import { Link, useHistory } from 'react-router-dom';
import Task from '../todo/Task';
import {
  bars,
  close,
  phone,
  plusSign,
  home,
  logOutIcon,
  zhonya,
  dolar,
  settings,
  search,
} from './HamburgerIcons';
import TasksFound from './TasksFound';
import ReactJoyride from 'react-joyride';

const HamburgerDiv = styled.div`
  position: ${({ change }) => (change ? 'absolute' : 'fixed')};
  height: ${({ heightCalc, AreTasks }) =>
    AreTasks ? `${heightCalc}px` : '100vh'};
  top: 0;
  left: 0;
  width: 100%;
  transition: transform 0.3s ease-in-out;
  background: var(--header-color);
  z-index: 6;
  transform: ${({ isOpen }) =>
    isOpen ? 'translateY(0)' : 'translateY(-100%)'};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
`;

const Hamburger = ({ isOpen, setIsOpen, userD }) => {
  const [state, actions] = useCounter();
  const history = useHistory();
  const [content, setContent] = useState('');
  const [clicked, setClicked] = useState(false);
  const [results, setResults] = useState([]);
  const [change, setChange] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [AreTasks, setAreTasks] = useState(false);

  useEffect(() => {
    fetch('/api/userpanel')
      .then((res) => res.json())
      .then((json) => {
        if (json.correct) {
          actions.user(json);
        }
      });
  }, []);

  const searchUserData = () => {
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
        setChange(true);
        setAreTasks(true);
      });
  };

  const heightCalc = results.length * 224;

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

  const STEPS = [
    {
      target: '.hamburger__input',
      content: 'Search for your completed and uncompleted tasks.',
      disableBeacon: true,
      placement: 'top',
      floaterProps: {
        disableAnimation: true,
      },
    },
    {
      target: '.credits',
      content: 'Credits are used to add new task',
      disableBeacon: true,
      placement: 'top',
      floaterProps: {
        disableAnimation: true,
      },
    },
    {
      target: '.hamburger_history',
      content: 'You can view all your completed task in the history section',
      placement: 'top',
      disableBeacon: true,
      floaterProps: {
        disableAnimation: true,
      },
    },
    {
      target: '.hamburger_credits',
      content: 'If you run out of credits you can buy more from our shop',
      placement: 'top',
      disableBeacon: true,
      floaterProps: {
        disableAnimation: true,
      },
    },
    {
      target: '.hamburger_contact',
      content:
        'If you have some problems with our app or you just want to send message, got here.',
      placement: 'top',
      disableBeacon: true,
      floaterProps: {
        disableAnimation: true,
      },
    },
    {
      target: '.hamburger_settings',
      content: 'Change account setting, theme or delete your account ',
      placement: 'top',
      disableBeacon: true,
      floaterProps: {
        disableAnimation: true,
      },
    },
  ];

  const [cookies] = useCookies({});
  const { user } = cookies;

  const unCompletedTasks = results.filter(
    (item) => item.complete !== 'Completed'
  );
  const completedTasks = results.filter(
    (item) => item.complete === 'Completed'
  );

  return (
    <div style={{ position: 'relative' }}>
      <Tour steps={STEPS} />

      <HamburgerDiv
        heightCalc={heightCalc}
        AreTasks={AreTasks}
        change={change}
        isOpen={isOpen}
      >
        <div className="actions">
          <div></div>
          <p>
            <span>mn</span>Tasks
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
            onClick={() => searchUserData()}
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
              }}
            >
              Cancel
            </button>
          )}
        </div>
        {clicked && (
          <TasksFound
            content={content}
            searchUserData={searchUserData}
            completedTasks={completedTasks}
            unCompletedTasks={unCompletedTasks}
          />
        )}
        {!clicked && (
          <div>
            <div className="credits">
              <p>
                Your credits:
                <span> {state.correct && state.userData.user[0].credits}</span>
              </p>
            </div>
            <ListHamburger />
            <div onClick={() => singOut()} className="log__out">
              {logOutIcon}
            </div>
          </div>
        )}
      </HamburgerDiv>
    </div>
  );
};

export default Hamburger;
