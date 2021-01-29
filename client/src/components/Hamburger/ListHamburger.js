import React from 'react';
import { Link } from 'react-router-dom';
import Tour from '../Guide/Tour';
import {
  bars,
  close,
  phone,
  plusSign,
  home,
  logOut,
  zhonya,
  dolar,
  settings,
} from './HamburgerIcons';

const ListHamburger = () => {
  return (
    <ul
      className="list__hamburger lines-hamburger"
      style={{ textAlign: 'left' }}
    >
      <li style={{ marginTop: '4rem' }}>
        <Link
          className="hamburger_link hamburger_history"
          to="/completed-tasks"
        >
          History
          {zhonya}
        </Link>
      </li>
      <li>
        <Link className="hamburger_link hamburger_credits" to="/subscription">
          Pricing
          {dolar}
        </Link>
      </li>
      <li>
        <Link className="hamburger_link hamburger_credits" to="/contact-us">
          Contact
          {phone}
        </Link>
      </li>
      <li>
        <Link className="hamburger_link hamburger_credits" to="/settings">
          Settings
          {settings}
        </Link>
      </li>
    </ul>
  );
};

export default ListHamburger;
