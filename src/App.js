import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';

const kBaseUrl = 'https://task-list-api-c17.herokuapp.com';

const transformTaskFromJson = (task) => {
  const { description, id, is_complete: isComplete, title } = task;
  return { id, title, description, isComplete };
};

const getTasksFromAPI = () => {
  return axios
    .get(`${kBaseUrl}/tasks`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.text);
      return error;
    });
};

const markCompleteAPI = (id) => {
  return axios
    .patch(`${kBaseUrl}/tasks/${id}/mark_complete`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.text);
      return error;
    });
};

const markIncompleteAPI = (id) => {
  return axios
    .patch(`${kBaseUrl}/tasks/${id}/mark_incomplete`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.text);
      return error;
    });
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getTasksFromAPI().then((apiTasks) => {
      if (apiTasks instanceof Array) {
        const transformedTasks = apiTasks.map((task) =>
          transformTaskFromJson(task)
        );
        setTasks(transformedTasks);
      } else {
        setErrorMsg(
          `ERROR ${apiTasks.response.status} ${apiTasks.response.text}`
        );
      }
    });
  }, []);

  const updateTasks = (updatedTask) => {
    const newTasks = tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      }
      return task;
    });
    setTasks(newTasks);
  };

  const updateTask = (updatedTask) => {
    if (updatedTask.isComplete) {
      markCompleteAPI(updatedTask.id).then((updatedTaskAPI) => {
        updateTasks(transformTaskFromJson(updatedTaskAPI.task));
      });
    } else {
      markIncompleteAPI(updatedTask.id).then((updatedTaskAPI) => {
        updateTasks(transformTaskFromJson(updatedTaskAPI.task));
      });
    }
  };

  const deleteTask = (id) => {
    const newTasks = [];
    for (let task of tasks) {
      if (task.id !== id) {
        newTasks.push(task);
      }
    }
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {
            <TaskList
              tasks={tasks}
              onUpdateTasks={updateTask}
              onDeleteTask={deleteTask}
            />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
