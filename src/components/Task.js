import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, updateTasks }) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  const updateTask = () => {
    const newTask = { id, title, isComplete: !isComplete };
    updateTasks(newTask);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={updateTask}
      >
        {title}
      </button>
      <button className="tasks__item__remove button">x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  updateTasks: PropTypes.func.isRequired,
};

export default Task;
