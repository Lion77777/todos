import React, { useReducer } from 'react';
import './App.css';
import { tasksReducer } from './model/tasks-reducer';
import { v1 } from 'uuid';

export type Task = {
  id: string
  title: string
  status: boolean
}

function App() {
  const [tasks, dispatchTasks] = useReducer(tasksReducer, [
    { id: v1(), status: false, title: 'Тестовое задание' },
    { id: v1(), status: true, title: 'Прекрасный код' },
    { id: v1(), status: false, title: 'Покрытие тестами' }
  ])

  return (
    <div className='container'>
      <h1>todos</h1>
      <div className='wrapper'>
        <input type='text' name='title' className='title-input' placeholder='What needs to be done?' />
        <ul className='task-list'>
          {
            tasks.map(task => {
              return <li className='task-item' key={task.id}>
                <input type='checkbox' name='status' className='task-item_rounded-checkbox' checked={task.status} />
                <span className='task-item_title'>{task.title}</span>
              </li>
            })
          }
        </ul>
      </div>
      <footer className='footer-wrapper'>
        <div className='footer'>
          <span className='count'>2 items left</span>
          <div className='filters'>
            <button type='button'>All</button>
            <button type='button'>Active</button>
            <button type='button'>Completed</button>
          </div>
          <button type='button' className='clear'>Clear completed</button>
        </div>
      </footer>
    </div>
  );
}

export default App;
