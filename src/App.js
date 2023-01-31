import React, { useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
  {
    id: 3,
    title: 'Rest',
    isComplete: false,
  },
];

const App = () => {
  const [tasks, setTasks] = useState(TASKS);

  const updateTasks = (udpatedTask) => {
    const newTasks = tasks.map((task) => {
      if (task.id === udpatedTask.id) {
        return udpatedTask;
      }
      return task;
    });
    setTasks(newTasks);
  };

  const deleteTask = (id) => {
    const newTasks = [];
    console.log('Value of newTasks inside delete');
    console.log(newTasks);
    console.log('value of tasks in delete');
    console.log(tasks);
    for (let task of tasks) {
      console.log(task);
      if (task.id !== id) {
        newTasks.push(task);
      }
    }
    console.log(newTasks);
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
              onUpdateTasks={updateTasks}
              onDeleteTask={deleteTask}
            />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
