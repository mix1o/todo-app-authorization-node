import React, { useState, useEffect } from 'react';
import UserTodos from './UserTodos';
import { CounterSubscriber, useCounter } from '../../store/sub';
import { illustration } from '../../illustration';
import Todo from '../todo/Todo';
import styled from 'styled-components';
import BasicLoadingAni from '../animation/BasicLoadingAni';
import MenuBottom from '../Hamburger/MenuBottom';
import HamburgerTop from '../Hamburger/HamburgerTop';
import { AnimatePresence } from 'framer-motion';

const StyledDiv = styled.div`
  text-align: center;
  padding: 9rem 1.5rem;
  filter: ${({ open }) => (open ? 'blur(3px)' : 'blur(0)')};
  background: ${({ open }) => (open ? 'rgb(235, 235, 235)' : '#fff')};
  height: 93vh;
  @media (max-width: 350px) and (orientation: portrait){
    padding: 1rem;
  }
`;

const UserPanel = () => {
  const [open, setOpen] = useState(false);
  const [loadingAnimation, setStartAnimation] = useState(true);
  const [state, actions] = useCounter();
  const [tasks, setTasks] = useState([]);

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
          actions.user(json);
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
      <HamburgerTop onAdd={handlerAdd} blur={state.newTodo} />
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

            <AnimatePresence>
              {state.newTodo && <Todo onAdd={handlerAdd} setOpen={setOpen} />}
            </AnimatePresence>
          </div>
        )}
        {filteredUnCompleted.length > 0 && (
          <UserTodos
            onAdd={handlerAdd}
            tasks={tasks}
            loadingAnimation={loadingAnimation}
          />
        )}
        <MenuBottom />
      </div>
    </>
  );
};

export default UserPanel;
