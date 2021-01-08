import React, { useState } from 'react';
import { CounterSubscriber, useCounter } from '../../store/sub';

const Task = ({ id, name, desc, prio, date, status, input }) => {
  let dateF = new Date(date);
  let day = dateF.getDate();
  let month = dateF.getMonth() + 1;
  let years = dateF.getFullYear();

  if(day < '10'){
    day = `0${day}`
  }
  if(month < '10'){
    month = `0${month}`
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
    <section className="section__task">
      <div className="status-div"><div style={{marginRight: '10px'}} className={`circle ${prio}`}></div><p className="task__name">{name}</p></div>
      <p className="task__desc">{desc}</p>
      {input && (
        <>
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
        </>
      )}
      </section>
  );
};

export default Task;
