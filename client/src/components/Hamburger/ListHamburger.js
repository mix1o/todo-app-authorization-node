import React from 'react';
import { Link } from 'react-router-dom';
import Tour from '../Guide/Tour';

const ListHamburger = () => {
  return (
    <ul className="list__hamburger" style={{ textAlign: 'left' }}>
      <li>
        <Link className="hamburger_link" to="/about">
          About
        </Link>
      </li>
      <li>
        <Link className="hamburger_link" to="/settings">
          Settings
        </Link>
      </li>
      <li>
        <Link
          className="hamburger_link hamburger_history"
          to="/completed-tasks"
        >
          History
        </Link>
      </li>
      <li>
        <Link className="hamburger_link hamburger_credits" to="/subscription">
          Add Credits
        </Link>
      </li>
    </ul>
  );
};

export default ListHamburger;
