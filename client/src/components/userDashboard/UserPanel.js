import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserTodos from './UserTodos';
import Payments from '../payments/Payments';
import Card from '../payments/Card';
import { CounterSubscriber, useCounter } from '../../store/sub';
import { illustration } from '../../illustration';
import Todo from '../todo/Todo';
import styled from 'styled-components';
import Footer from '../page/Footer';
import { STATES } from 'mongoose';
import Tour from '../Guide/Tour';
import { Link } from 'react-router-dom';
import BasicLoadingAni from '../animation/BasicLoadingAni';
import MenuBottom from '../Hamburger/MenuBottom';
import HamburgerTop from '../Hamburger/HamburgerTop';

const StyledDiv = styled.div`
  text-align: center;
  padding: 9rem 1.5rem;
  filter: ${({ open }) => (open ? 'blur(3px)' : 'blur(0)')};
  background: ${({ open }) => (open ? 'rgb(235, 235, 235)' : '#fff')};
  height: 93vh;
`;

const UserPanel = () => {
  const [showBox, setShowBox] = useState(true);
  const [open, setOpen] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [loadingAnimation, setStartAnimation] = useState(true);

  const [message, setMessage] = useState('');
  const [startTour, setStartTour] = useState();
  const [state, actions] = useCounter();
  const [userD, setUserD] = useState([]);
  const [tasks, setTasks] = useState([]);

  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      setStartAnimation(false);
    }, 1500);
  }, []);

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
      {!loadingAnimation && (
        <HamburgerTop onAdd={handlerAdd} blur={state.newTodo} />
      )}
      {!loadingAnimation && (
        <div>
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
          <MenuBottom />
        </div>
      )}
    </>
  );
};

export default UserPanel;
