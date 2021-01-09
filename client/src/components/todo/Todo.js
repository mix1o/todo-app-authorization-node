import React, { useState } from 'react';
import { useCounter } from '../../store/sub';

const Todo = () => {
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

    setTaskData({ ...taskData, [name]: value });
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
        }
      });
  };

  return (
    <section className="todo__body">
      <p style={{ fontSize: '15px', color: '#4a5568' }}>Make a new task</p>
      <label className="todo__taskName">
        <input
          name="Title"
          type="text"
          placeholder="Short title of the task"
          value={taskData.Title}
          onChange={(e) => handlerInput(e)}
        />
      </label>
      <label className="todo__taskName">
        <input
          className="todo__description"
          name="Description"
          type="text"
          placeholder="Description of the task e.g. Meet up with fiance"
          value={taskData.Description}
          onChange={(e) => handlerInput(e)}
        />
      </label>
      <div className="todo__actions">
        <button className="btn-newtask" onClick={addNewTask}>
          Add task
        </button>
        {!sel && (
          <div onClick={() => setSel(true)}>
            <i>
              <svg
                width="29"
                height="30"
                viewBox="0 0 29 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4348 2.5C20.7279 2.5 25.8478 8.1075 25.8478 15C25.8478 21.8925 20.7279 27.5 14.4348 27.5C8.14163 27.5 3.02174 21.8925 3.02174 15C3.02174 8.1075 8.14163 2.5 14.4348 2.5ZM14.4348 0C6.87136 0 0.739136 6.71625 0.739136 15C0.739136 23.2837 6.87136 30 14.4348 30C21.9982 30 28.1304 23.2837 28.1304 15C28.1304 6.71625 21.9982 0 14.4348 0ZM13.2935 7.5H15.5761V17.5H13.2935V7.5ZM14.4348 22.8125C13.6473 22.8125 13.0082 22.1125 13.0082 21.25C13.0082 20.3875 13.6473 19.6875 14.4348 19.6875C15.2223 19.6875 15.8614 20.3875 15.8614 21.25C15.8614 22.1125 15.2223 22.8125 14.4348 22.8125Z"
                  fill="#718096"
                />
              </svg>
            </i>
          </div>
        )}
        {sel && (
          <select name="Priority" onChange={(e) => handlerInput(e)}>
            <option>Low</option>
            <option>Normal</option>
            <option>High</option>
          </select>
        )}
      </div>
      <p className="task__message">{message}</p>
    </section>
  );
};

export default Todo;
