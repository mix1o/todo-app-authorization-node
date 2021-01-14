import React from 'react';
import { Link } from 'react-router-dom';
import addTask from '../../img/addTask.jpg';
import taskHistory from '../../img/taskHistory.jpg';
import taskUserPanel from '../../img/taskUserPanel.jpg';

const HoWorks = () => {
  return (
    <>
      <Link to="/">
        <svg
          style={{ margin: '2rem' }}
          width="40"
          height="40"
          viewBox="0 0 49 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="24.0475"
            cy="24.0475"
            r="23.0475"
            stroke="#4A5568"
            strokeWidth="2"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.344 25.55L24.56 33.4523L23.202 35L11 24.5L23.224 14L24.556 15.5813L15.348 23.45H39V25.55H15.344Z"
            fill="#4A5568"
          />
        </svg>
      </Link>

      <main>
        <h3 className="heading-3">How it works</h3>
        <section className="how-works-box">
          <div></div>
          <p className="title-box">
            Our application gives you the ability to save your daily tasks
          </p>
          <div>
            <img
              style={{ width: '100%' }}
              src={addTask}
              alt="image how to add task"
            />
          </div>
        </section>
        <section className="how-works-box">
          <p className="title-box">
            You can manage all your<strong> daily tasks</strong> in one place.
          </p>
          <div>
            <img
              style={{ width: '100%' }}
              src={taskUserPanel}
              alt="image how to add task"
            />
          </div>
        </section>
        <section className="how-works-box">
          <p className="title-box">Completed are done</p>
          <div>
            <img
              style={{ width: '100%' }}
              src={taskHistory}
              alt="image how to add task"
            />
          </div>
        </section>
        <section className="how-works-box">
          <p className="title-box">What are credits?</p>
          <p>Credits are used on the site to add more tasks</p>
          <p>You can buy more credits in our shop</p>
          <div>
            <img src="pass" alt="image" />
          </div>
        </section>
        <section className="how-works-box">
          <p className="title-box">
            Start your journey <strong>now</strong>
          </p>
          <p>You can easily join us</p>
          <div>
            <Link
              style={{ marginTop: '2rem', marginBottom: '0' }}
              className="heading__btn"
              to="/sing-up"
            >
              Sign up
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default HoWorks;
