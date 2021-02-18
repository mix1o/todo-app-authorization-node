import React, { useState } from 'react';
import { bars, close } from './HamburgerIcons';
import Hamburger from './Hamburger';
import styled from 'styled-components';

const BiggerPolygon = styled.div`
  @media (min-width: 576px) and (orientation: landscape) {
    height: 57px;
  }
   @media (min-width: 1366px) {
    display: none;
  } ;
  position: fixed
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 3;
  background-color: var(--main-color-green);
  height: 65px;
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 25%);
`;
const SmallerPolygon = styled.div`
  @media (min-width: 576px) and (orientation: landscape) {
    height: 70px;
    clip-path: polygon(50% 0, 100% 0, 100% 90%, 65% 62%, 50% 0);
  }
  @media (min-width: 1366px) {
    display: none;
  }
  position: fixed;
  top: 0;
  right: 0;
  background-color: var(--header-color);
  width: 20vw;
  z-index: 7;
  min-width: 40px;
  height: 80px;
  clip-path: polygon(0 0, 100% 0, 100% 90%, 40% 60%, 0 0);
  text-align: right;
  padding: 0.75rem;
`;

const HamburgerTop = ({ onAdd, blur }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      id="todo"
      className={`${blur ? 'hamburger__topBlur' : ' '}`}
      style={{
        position: 'sticky',
        top: '0',
        left: '0',
        zIndex: '6',
      }}
    >
      <Hamburger onAdd={onAdd} isOpen={isOpen} setIsOpen={setIsOpen} />
      <BiggerPolygon />

      <SmallerPolygon
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        isOpen={isOpen}
        disable={blur}
        className={`${blur ? 'menu__disable' : ''} menu__polygon`}
      >
        {isOpen ? close : bars}
      </SmallerPolygon>
    </div>
  );
};

export default HamburgerTop;
