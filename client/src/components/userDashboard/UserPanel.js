import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserTodos from './UserTodos';
import Payments from '../payments/Payments';
import Card from '../payments/Card';
import { CounterSubscriber, useCounter } from '../../store/sub';
import Header from '../page/Header';
import { illustration } from '../../illustration';
import Todo from '../todo/Todo';
import styled from 'styled-components';
import Footer from '../page/Footer';
import { STATES } from 'mongoose';
import Tour from '../Guide/Tour';
import { Link } from 'react-router-dom';
import BasicLoadingAni from '../animation/BasicLoadingAni';

const StyledDiv = styled.div`
  text-align: center;
  padding: 9rem 1.5rem;
  filter: ${({ open }) => (open ? 'blur(3px)' : 'blur(0)')};
  background: ${({ open }) => (open ? 'rgb(235, 235, 235)' : '#fff')};
  height: 93vh;
`;

const UserPanel = () => {
  const [message, setMessage] = useState('');

  const history = useHistory();

  const [startTour, setStartTour] = useState();
  const [showBox, setShowBox] = useState(true);
  const [open, setOpen] = useState(false);
  const [state, actions] = useCounter();
  const [userD, setUserD] = useState([]);
  const [correct, setCorrect] = useState(false);
  const [loadingAnimation, setStartAnimation] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStartAnimation(false);
    }, 1500);
  }, []);

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

  const loadTasks = () => {
    fetch('/api/todos')
      .then((response) => response.json())
      .then((json) => {
        setTasks(json);
      });

    fetch('/api/userpanel')
      .then((res) => res.json())
      .then((json) => {
        if (json.correct) {
          setUserD(json);
          actions.user(json);
          setCorrect(true);
        }
      });
  };

  const handlerAdd = () => {
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
    actions.loadUser({ fun: handlerAdd });
  }, []);

  const filteredUnCompleted = tasks.filter(
    (item) => item.complete !== 'Completed'
  );

  return (
    <>
      {loadingAnimation && <BasicLoadingAni />}
      {!loadingAnimation && <div>
      <Header />
      {filteredUnCompleted.length < 1 && (
        <div className="center">
          <div
            onClick={() => {
              if (state.newTodo) {
                actions.openTodo(false);
              }
            }}
          >
            <StyledDiv open={state.newTodo}>
              <h2 className="heading-2">Start with adding new task</h2>
              {!open && (
                <button
                  className="btn-user-panel"
                  onClick={() => actions.openTodo(true)}
                >
                  Add task
                </button>
              )}
              <div className="user-panel-svg">{illustration}</div>
            </StyledDiv>
          </div>
          {state.newTodo && <Todo onAdd={handlerAdd} setOpen={setOpen} />}
        </div>
      )}
      {filteredUnCompleted.length > 0 && (
        <UserTodos onAdd={handlerAdd} tasks={tasks} />
      )}
      </div>}
    </>
  );
};

export default UserPanel;
