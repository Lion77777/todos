import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className='container'>
      <h1>todos</h1>
      <div className='wrapper'>
        <input type='text' name='title' className='' />
        <ul>
          <li>
            <input type='checkbox' name='status' />
            Тестовое задание
          </li>
          <li>
            <input type='checkbox' name='status' />
            Прекрасный код
          </li>
          <li>
            <input type='checkbox' name='status' />
            Покрытие тестами
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
          <button type='button'>Clear completed</button>
        </div>
      </footer>
    </div>
  );
}

export default App;
