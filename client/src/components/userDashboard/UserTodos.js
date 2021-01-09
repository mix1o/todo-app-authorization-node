import React, { useState, useEffect } from 'react';
import Task from '../todo/Task';
import { CounterSubscriber, useCounter } from '../../store/sub';
import styled from 'styled-components';
import Todo from '../todo/Todo';
import Footer from '../page/Footer';

const StyledDiv = styled.div`
  filter: ${({ open }) => (open ? 'blur(3px)' : 'blur(0)')};
  background: ${({ open }) => (open ? 'rgb(235, 235, 235)' : '#fff')};
  padding: 1rem;
  height: auto;
`;

const UserTodos = ({ tasks }) => {
  const newItems = tasks.filter((item) => item.complete !== 'Completed');
  const completedItems = tasks.filter((item) => item.complete === 'Completed');
  const [seeCompleted, setSeeCompleted] = useState(false);
  const [state, actions] = useCounter();
  const [check, setCheck] = useState(false);

  let date = new Date();

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let dayName = days[date.getDay()];
  let month = monthNames[date.getMonth()];
  let dayOfWeek = date.getDate();

  return (
    <div className="center">
      <div
        onClick={() => {
          if (state.newTodo) {
            actions.openTodo(false);
          }
        }}
      >
        <StyledDiv open={state.newTodo} class="tasks">
          <h3>
            Today is <span>{`${dayName} ${dayOfWeek} ${month}`}</span>
          </h3>
          {tasks && (
            <p style={{ fontSize: '12px', marginBottom: '2rem' }}>
              Total tasks:
              <span className="task__total">{newItems.length}</span>
            </p>
          )}
          <p style={{ fontSize: '22px' }}>Current tasks</p>
          {newItems
            .reverse()
            .map(
              ({ _id, name, description, priority, date, complete, input }) => (
                <Task
                  id={_id}
                  key={_id}
                  name={name}
                  desc={description}
                  prio={priority}
                  date={date}
                  status={complete}
                  input={true}
                />
              )
            )}
          <div style={{ textAlign: 'center' }}>
            <a onClick={() => actions.openTodo(true)} className="btn-tasks-new" style={{display:'inline-block',color: '#1db95e',textDecoration: 'none', fontSize: '1.4rem', background: 'transparent'}} href="#todo">Add task
            </a>   
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: '4rem',
            }}
          >
            <p style={{ fontSize: '22px', margin: '0 1rem' }}>
              Completed tasks
            </p>
            <div onClick={() => setSeeCompleted(!seeCompleted)}>
              {!seeCompleted && (
                <i>
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  >
                    <path
                      d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm5.247 8l-5.247 6.44-5.263-6.44-.737.678 6 7.322 6-7.335-.753-.665z"
                      fill="#000"
                    />
                  </svg>
                </i>
              )}
              {seeCompleted && (
                <i>
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  >
                    <path
                      d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm5.247 15l-5.247-6.44-5.263 6.44-.737-.678 6-7.322 6 7.335-.753.665z"
                      fill="#000"
                    />
                  </svg>
                </i>
              )}
            </div>
          </div>
          {
            <div>
              {seeCompleted &&
                completedItems
                  .reverse()
                  .map(
                    ({ _id, name, description, priority, date, complete }) => (
                      <Task
                        id={_id}
                        key={_id}
                        name={name}
                        desc={description}
                        prio={priority}
                        date={date}
                        status={complete}
                      />
                    )
                  )}
            </div>
          }
          {!tasks.length > 0 && <p>You don't have any tasks yet.</p>}
          <Footer />
        </StyledDiv>
      </div>
      {state.newTodo && <Todo />}
    </div>
  );
};

export default UserTodos;
