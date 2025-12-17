import { ChangeEvent, KeyboardEvent, useReducer, useState } from 'react';
import './App.css';
import { changeTaskStatusAC, createTaskAC, tasksReducer } from './model/tasks-reducer';
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
  const [title, setTitle] = useState('')
  const [active, setActive] = useState(tasks.length)

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const createTask = () => {
    const trimmedTitle = title.trim()

    if (trimmedTitle) {
      dispatchTasks(createTaskAC(trimmedTitle))
    }

    setTitle('')
  }

  const createTaskOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createTask()
    }
  }

  const changeTaskStatus = (id: string, status: boolean) => {
    dispatchTasks(changeTaskStatusAC({ id, status }))
  }

  const countActive = () => {
    const activeTasks = tasks.filter(task => !task.status)

    return activeTasks.length
  }

  return (
    <div className='container'>
      <h1>todos</h1>
      <div className='wrapper'>
        <input type='text'
          name='title'
          value={title}
          onChange={handleTitle}
          onKeyDown={createTaskOnEnter}
          className='title-input'
          placeholder='What needs to be done?' />
        <ul className='task-list'>
          {
            tasks.map(task => {
              const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(task.id, e.currentTarget.checked)
              }

              return <li className='task-item' key={task.id}>
                <input type='checkbox' name='status' onChange={changeTaskStatusHandler} className='task-item_rounded-checkbox' checked={task.status} />
                <span className='task-item_title'>{task.title}</span>
              </li>
            })
          }
        </ul>
      </div>
      <footer className='footer-wrapper'>
        <div className='footer'>
          <span className='count'>{countActive()} items left</span>
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
