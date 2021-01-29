import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ListHamburger from './ListHamburger';
import { useCookies } from 'react-cookie';
import { useCounter } from '../../store/sub';
import Tour from '../Guide/Tour';
import { Link } from 'react-router-dom';
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

const HamburgerDiv = styled.div`
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  transition: transform 0.3s ease-in-out;
  background: var(--header-color);
  z-index: 6;
  transform: ${({ isOpen }) =>
    isOpen ? 'translateY(0)' : 'translateY(-100%)'};
`;

const Hamburger = ({ isOpen, setIsOpen, logOut, correct, userD }) => {
  const [state, actions] = useCounter();

  useEffect(() => {
    fetch('/api/userpanel')
      .then((res) => res.json())
      .then((json) => {
        if (json.correct) {
          actions.user(json);
        }
      });
  }, []);

  const STEPS = [
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
      content: 'You can view all your completed task in history section',
      placement: 'bottom-end',
      disableBeacon: true,

      floaterProps: {
        disableAnimation: true,
      },
    },
    {
      target: '.hamburger_credits',
      content: 'If you run out of credits you can buy them in our shop',
      placement: 'bottom-end',
      disableBeacon: true,
      floaterProps: {
        disableAnimation: true,
      },
    },
  ];

  const [cookies] = useCookies({});
  const { user } = cookies;
  return (
    <>
      <HamburgerDiv isOpen={isOpen}>
        <div className="actions">
          <div></div>
          <p>
            <span>mn</span>Tasks
          </p>
          <div onClick={() => setIsOpen(false)}>{close}</div>
        </div>
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
          <div className="hamburger__div__input">
            <div style={{ position: 'absolute', top: '7px', left: '10px' }}>
              {search}
            </div>
            <input
              placeholder="What do you need?"
              className="hamburger__input"
              type="text"
            />
          </div>
        </div>
        <div className="credits">
          <p>
            Your credits:{' '}
            <span> {state.correct && state.userData.user[0].credits}</span>
          </p>
        </div>
        <ListHamburger />
        <div onClick={() => logOut()} className="log__out">
          {logOutIcon}
        </div>
      </HamburgerDiv>
    </>
  );
};

export default Hamburger;
