import React, { useState } from 'react';
import { CounterSubscriber, useCounter } from '../../store/sub';
import Tour from '../Guide/Tour';

const Task = ({
  id,
  name,
  desc,
  prio,
  date,
  status,
  input,
  isCompleted,
  bgColor,
  finished,
}) => {
  let dateF = new Date(date);
  let day = dateF.getDate();
  let month = dateF.getMonth() + 1;
  let years = dateF.getFullYear();

  if (day < '10') {
    day = `0${day}`;
  }
  if (month < '10') {
    month = `0${month}`;
  }

  let dateCompleted = new Date(finished);
  let dayCompleted = dateCompleted.getDate();
  let monthCompleted = dateCompleted.getMonth() + 1;
  let yearsCompleted = dateCompleted.getFullYear();
  let hoursCompleted = dateCompleted.getHours();
  let minutesCompleted = dateCompleted.getMinutes();
  let secondsCompleted = dateCompleted.getSeconds();

  if (dayCompleted < '10') {
    dayCompleted = `0${dayCompleted}`;
  }
  if (monthCompleted < '10') {
    monthCompleted = `0${monthCompleted}`;
  }
  if (hoursCompleted < '10') {
    hoursCompleted = `0${hoursCompleted}`;
  }
  if (minutesCompleted < '10') {
    minutesCompleted = `0${minutesCompleted}`;
  }
  if (secondsCompleted < '10') {
    secondsCompleted = `0${secondsCompleted}`;
  }

  const sendStatus = (idTask) => {
    fetch('/api/changeStatusTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idTask: idTask,
      }),
    });
    console.log(state.idOfTask);
  };

  const [state, actions] = useCounter();

  return (
    <section className={`section__task ${bgColor}`}>
      <div className="status-div">
        <div style={{ marginRight: '10px' }} className={`circle ${prio}`}></div>
        <p className="task__name">{name}</p>
      </div>
      <p className="task__desc">{desc}</p>
      <p style={{ fontSize: '1.5rem' }} className="task__desc">
        Status:{' '}
        <span style={{ fontSize: '1.4rem', color: '#2d3748' }}>{status}</span>
      </p>
      {input && (
        <div className="status__task">
          <p className="task__date">Added {`${day}:${month}:${years}`}</p>
          <div className="finish">
            <p className="finish_text">Finish now</p>
            <input
              type="checkbox"
              value={id}
              onClick={(e) => {
                sendStatus(e.target.value);
              }}
            />
          </div>
        </div>
      )}
      {isCompleted && (
        <div style={{ display: 'block' }} className="status__task">
          <p className="task__date">
            Date added:{' '}
            <span
              style={{ fontWeight: '900' }}
            >{`${day}:${month}:${years}`}</span>
          </p>
          <p
            style={{
              borderBottom: '1px solid #333',
              paddingBottom: '.3rem',
              textAlign: 'center',
              marginTop: '2rem',
            }}
          >
            Date finished:{' '}
            {`${dayCompleted}:${monthCompleted}:${yearsCompleted}`}
            <span
              style={{ fontWeight: '700', marginLeft: '1rem' }}
            >{`${hoursCompleted}:${minutesCompleted}:${secondsCompleted}`}</span>
          </p>
        </div>
      )}
    </section>
  );
};

export default Task;
