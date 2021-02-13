import React from 'react';
import { Link } from 'react-router-dom';
import { phone, zhonya, dolar, settings } from './HamburgerIcons';

const ListHamburger = ({ open }) => {
  return (
    <>
      {open && (
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

          <li className="lower">
            <Link
              className="hamburger_link hamburger_credits"
              to="/subscription"
            >
              Pricing
              {dolar}
            </Link>
          </li>
          <li className="lower">
            <Link className="hamburger_link hamburger_contact" to="/contact-us">
              Contact
              {phone}
            </Link>
          </li>
          <li className="lower">
            <Link className="hamburger_link hamburger_settings" to="/settings">
              Settings
              {settings}
            </Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default ListHamburger;
