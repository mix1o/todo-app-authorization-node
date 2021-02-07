import React, { useState } from 'react';
import styled from 'styled-components';
import { bars, close } from './HamburgerIcons';
import Hamburger from './Hamburger';

const BiggerPolygon = styled.div`
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
      className={`${blur ? 'hamburger__topBlur' : ' '}`}
      style={{ position: 'sticky', top: '0', left: '0', zIndex: '6' }}
    >
      <Hamburger onAdd={onAdd} isOpen={isOpen} setIsOpen={setIsOpen} />
      <BiggerPolygon />
      <SmallerPolygon
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        isOpen={isOpen}
      >
        {isOpen ? close : bars}
      </SmallerPolygon>
    </div>
  );
};

export default HamburgerTop;
