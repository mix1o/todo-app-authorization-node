import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserTodos from './UserTodos';
import Payments from '../payments/Payments';
import Card from '../payments/Card';
import { CounterSubscriber, useCounter } from '../../store/sub';
import Header from '../page/Header';
import { illustration } from '../../svg';
import Todo from '../todo/Todo';
import styled from 'styled-components';
import Footer from '../page/Footer';
import { STATES } from 'mongoose';

const StyledDiv = styled.div`
  text-align: center;
  padding: 9rem 1.5rem;
  filter: ${({ open }) => (open ? 'blur(3px)' : 'blur(0)')};
  background: ${({ open }) => (open ? 'rgb(235, 235, 235)' : '#fff')};
  height: 93vh;
`;

const UserPanel = () => {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState([]);
  const history = useHistory();
  const [correct, setCorrect] = useState(false);
  const [open, setOpen] = useState(false);
const [state,actions] = useCounter();

  useEffect(() => {
    fetch('/api/userpanel')
      .then((res) => res.json())
      .then((json) => {
        setUser(json);
        setCorrect(true);
      });
    // .then((json) => console.log(json));
  }, []);

  const singOut = () => {
    fetch('/api/signOut', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      history.push('/');
      window.location.reload();
    });
  };

  // const convertDate = () => {
  //   if (correct) {
  //     const date = new Date(user[0].createdDate);
  //     const day = date.getDate();
  //     const month = date.getMonth() + 1;
  //     const year = date.getFullYear();
  //     const x = `${day}/${month}/${year}`;
  //     return x;
  //   }
  // };

  // const myNewDate = convertDate();

  const deleteAccount = () => {
    fetch('/api/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    history.push('/');
  };

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/api/todos')
      .then((response) => response.json())
      .then((json) => {
        setTasks(json);
      });
  }, [tasks]);

  return (
    <>
    
      <Header logOut={singOut}/>
      {tasks.length < 1 && (
        <div className="center">
          <div
            onClick={() => {
              if (state.newTodo) {
                actions.openTodo(false)
              }
            }}
          >
            <StyledDiv open={state.newTodo}>
              <h2 className="heading-2">Start with adding new task</h2>
              {!open && (
                <button
                  className="btn-user-panel"
                  onClick={() => setOpen(true)}
                >
                  Add task
                </button>
              )}
              <div className="user-panel-svg">{illustration}</div>
            </StyledDiv>
          </div>
          {open && <Todo setOpen={setOpen} />}
          
        </div>
      )}
      {tasks.length > 0 && <UserTodos tasks={tasks} />}
    </>
  );
};

export default UserPanel;
