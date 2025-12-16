import React from 'react';
import './App.css';

function App() {
  return (
    <div className='container'>
      <h1>todos</h1>
      <div className='wrapper'>
        <input type='text' name='title' className='title-input' placeholder='What needs to be done?'/>
        <ul className='task-list'>
          <li className='task-item'>
            <input type='checkbox' name='status' className='task-item_rounded-checkbox' />
            <span className='task-item_title'>Тестовое задание</span>
          </li>
          <li className='task-item'>
            <input type='checkbox' name='status' className='task-item_rounded-checkbox' />
            <span className='task-item_title'>Прекрасный код</span>
          </li>
          <li className='task-item'>
            <input type='checkbox' name='status' className='task-item_rounded-checkbox' />
            <span className='task-item_title'>Покрытие тестами</span>
          </li>
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
