import React from 'react';
import BasicLoadingAni from '../animation/BasicLoadingAni';
import Task from '../todo/Task';

const TasksFound = ({
  content,
  searchUserData,
  completedTasks,
  unCompletedTasks,
  areResult,
  results
}) => {


  return (
 
    <div style={{ padding: '1rem' }}>
       {areResult && results.length > 1 && <p className="hamburger__title">
        Results for:{' '}
        <span style={{ color: 'var(--main-color-green)', fontWeight: '700' }}>
          {content}
        </span>
      </p>}
      {unCompletedTasks.length > 0 && <hr style={{ margin: '2.5rem 0' }} />}
      {unCompletedTasks.length > 0 && (
        <p className="hamburger__title">Uncompleted tasks</p>
      )}
      {areResult && results.length < 1 && <p className="hamburger__title" >
        No results for:{' '}
        <span style={{ color: 'red', fontWeight: '700' }}>
          {content}
        </span>
      </p>}
      {unCompletedTasks.map(
        ({ _id, name, description, priority, date, complete, input }) => (
          <Task
            id={_id}
            key={_id}
            name={name}
            desc={description}
            prio={priority}
            date={date}
            status={complete}
            input={false}
            searchUserData={searchUserData}
            fontColor="var(--white)"
            searchUserBool={true}
          />
        )
      )}
      {completedTasks.length > 0 && <hr style={{ margin: '2.5rem 0' }} />}
      {completedTasks.length > 0 && (
        <p className="hamburger__title">Completed tasks</p>
      )}
      {completedTasks.map(
        ({
          _id,
          name,
          description,
          priority,
          date,
          complete,
          finishedDate,
        }) => (
          <Task
            id={_id}
            key={_id}
            name={name}
            desc={description}
            prio={priority}
            date={date}
            status={complete}
            isCompleted={true}
            bgColor="completed__task__bgColor"
            fontColor="var(--white)"
            finished={finishedDate}
          />
        )
      )}
    </div>
  );
};

export default TasksFound;
