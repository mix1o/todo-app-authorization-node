import React, { useState } from 'react';
import { useCounter } from '../../store/sub';
import Tour from '../Guide/Tour';
import { useCookies } from 'react-cookie';
import Warning from '../loginComponents/Warning';
import { STEPSTASK } from '../Guide/Steps';

const Todo = ({ onAdd }) => {
  const [cookies] = useCookies({});
  const { user } = cookies;

  const [isOpen, setIsOpen] = useState(false);
  const [state, actions] = useCounter();
  const [taskData, setTaskData] = useState({
    Title: '',
    Description: '',
    Priority: 'Low',
  });
  const [message, setMessage] = useState('');
  const [sel, setSel] = useState(false);
  const [correct, setCorrect] = useState();

  const handlerInput = (event) => {
    const target = event.target;
    const value = event.target.value;
    const name = target.name;

    // setTaskData({ ...taskData, [name]: value });
    setTaskData((data) => ({ ...data, [name]: value }));
  };

  const addNewTask = () => {
    fetch('/api/newToDo', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(taskData),
    })
      .then((response) => response.json())
      .then((json) => {
        setMessage(json.message);

        if (json.correct) {
          actions.openTodo(false);
          setTaskData({
            Title: '',
            Description: '',
            Priority: '',
          });
          onAdd();
        } else {
          setIsOpen(true);
          setTimeout(() => {
            setIsOpen(false);
          }, 2000);
        }
      });
  };

  return (
    <section className="todo__body">
      {user.newUser && <Tour open={true} steps={STEPSTASK} />}
      <p style={{ fontSize: '17px', color: '#4a5568' }}>Make a new task</p>
      <p style={{ marginTop: '1rem', fontSize: '13px', color: '#4a5568' }}>
        1 credit gives you 1 task
      </p>
      <label className="todo__taskName">
        <input
          className="label__input"
          name="Title"
          type="text"
          placeholder="Short title of the task"
          value={taskData.Title}
          onChange={(e) => handlerInput(e)}
        />
      </label>
      <label className="todo__taskName">
        <textarea
          className="label__textarea"
          name="Description"
          cols="41"
          rows="5"
          placeholder="Description of the task e.g. Meet up with fiance"
          value={taskData.Description}
          onChange={(e) => handlerInput(e)}
        />
      </label>
      <div className="todo__actions">
        <div className="select__diff">
          <select
            className="select__options"
            name="Priority"
            onChange={(e) => handlerInput(e)}
          >
            <option className="opt_low">Low</option>
            <option>Normal</option>
            <option>High</option>
          </select>
        </div>
        <p
          className="tour-credits"
          style={{
            fontSize: '14px',
            color: '#4a5568',
            marginRight: '5px',
          }}
        >
          Your credits:{' '}
          <span style={{ color: '#000' }}>
            {state.userData.user[0].credits}
          </span>
        </p>
      </div>

      <button className="btn-newtask" onClick={addNewTask}>
        Add task
      </button>
      {isOpen && <Warning errorMessage={message} setIsOpen={setIsOpen} />}
    </section>
  );
};

export default Todo;
