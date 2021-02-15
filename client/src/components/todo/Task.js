import React from 'react';
import { ConverDate } from '../../functions/ConvertDate';

const Task = ({
  id,
  name,
  desc,
  prio,
  date,
  input,
  isCompleted,
  bgColor,
  fontColor,
  finished,
  onAdd,
  searchUserData,
  searchUserBool,
  bgColorHistory,
}) => {
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
  };

  const dateOutput = ConverDate(date, finished);

  return (
    <section className={`section__task ${bgColor} ${bgColorHistory}`}>
      <div className={`status-div`}>
        <div style={{ marginRight: '10px' }} className={`circle ${prio}`}></div>
        <p className="task__name" style={{ color: fontColor }}>
          {name}
        </p>
      </div>
      <p className="task__desc" style={{ color: fontColor }}>
        {desc}
      </p>

      {input && (
        <div className="status__task">
          <p className="task__date">
            Added:
            <span
              style={
                fontColor
                  ? { color: fontColor }
                  : { color: 'var(--secondary-grey)' }
              }
            >
              {dateOutput.dateAdded}
            </span>
          </p>
          <label onClick={() => {
                sendStatus(id);
                onAdd();
                // if (searchUserBool) {
                //   searchUserData();
                // }
              }} className="finish">
            <p className="finish_text" style={{ color: fontColor }}>
              Finish now
            </p>
            <input
              type="checkbox"
              value={id}
              className="label__checkbox"
              
            />
            <i className="checkbox__indicator"></i>
          </label>
         
        </div>
      )}
      {isCompleted && (
        <div style={{ display: 'block' }} className="status__task">
          <p className="task__date" style={{ color: fontColor }}>
            Date added:
            <span style={{ fontWeight: '900', color: fontColor }}>
              {dateOutput.dateAdded}
            </span>
          </p>
          <p
            style={{
              borderBottom: '1px solid #333',
              paddingBottom: '.3rem',
              textAlign: 'center',
              marginTop: '2rem',
              color: fontColor,
            }}
          >
            Date finished:
            <span
              style={{
                fontWeight: '700',
                marginLeft: '1rem',
                color: fontColor,
              }}
            >
              {dateOutput.dateFinished}
            </span>
          </p>
        </div>
      )}
    </section>
  );
};

export default Task;
