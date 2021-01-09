import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCounter } from '../../store/sub';

const Header = ({ logOut }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [state, actions] = useCounter();

  return (
    <header className="header">
      <section className="left-section">
        <button onClick={logOut}>Sign out</button>
        <div className="left-section-first-item">
          <Link to="/">
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                name="homepage"
              >
                <path d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h18v-10h3zm-5 8h-14v-10.26l7-6.912 7 6.99v10.182zm-5-1h-4v-6h4v6z" />
              </svg>
            </i>
          </Link>
        </div>
        <div>
          <i>
            <svg
              onClick={() => {
                actions.openTodo(true);
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              name="add task"
            >
              <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
            </svg>
          </i>
        </div>
      </section>
      <nav className="menu" onClick={() => setIsOpen(!isOpen)}>
        <div>
          {!isOpen && (
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                name="show menu"
              >
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 17h-12v-2h12v2zm0-4h-12v-2h12v2zm0-4h-12v-2h12v2z" />
              </svg>
            </i>
          )}
          {isOpen && (
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                name="hide menu"
              >
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z" />
              </svg>
            </i>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

// https://iconmonstr.com/favorites/
//https://iconmonstr.com/menu-6-svg/
//https://iconmonstr.com/github-5-svg/
//https://iconmonstr.com/facebook-5-svg/
//https://iconmonstr.com/check-mark-2-svg/
