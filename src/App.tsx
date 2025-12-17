import { ChangeEvent, KeyboardEvent, useReducer, useState } from 'react';
import './App.css';
import { changeTaskStatusAC, clearCompletedTasksAC, createTaskAC, tasksReducer } from './model/tasks-reducer';
import { v1 } from 'uuid';

export type Task = {
  id: string
  title: string
  status: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

function App() {
  const [tasks, dispatchTasks] = useReducer(tasksReducer, [
    { id: v1(), status: false, title: 'Тестовое задание' },
    { id: v1(), status: true, title: 'Прекрасный код' },
    { id: v1(), status: false, title: 'Покрытие тестами' }
  ])
  const [title, setTitle] = useState('')
  const [filter, setFilter] = useState('all')
  let filteredTasks = tasks

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

  if (filter === 'active') {
    filteredTasks = tasks.filter(task => !task.status)
  }
  if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.status)
  }

  const showTaskAbsentMessage = (filter: string) => {
    if (filter === 'active' && filteredTasks.length === 0) {
      return (<p className='tasks-absent'>No active tasks</p>)
    }
    if (filter === 'completed' && filteredTasks.length === 0) {
      return (<p className='tasks-absent'>No completed tasks</p>)
    }
    if (filter === 'all' && filteredTasks.length === 0) {
      return (<p className='tasks-absent'>There are no tasks</p>)
    }

    return ''
  }

  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter(task => !task.status)

    dispatchTasks(clearCompletedTasksAC(true))
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
            showTaskAbsentMessage(filter) ||
            filteredTasks.map(task => {
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
            <button type='button' onClick={() => setFilter('all')}>All</button>
            <button type='button' onClick={() => setFilter('active')}>Active</button>
            <button type='button' onClick={() => setFilter('completed')}>Completed</button>
          </div>
          <button type='button' className='clear' onClick={clearCompletedTasks}>Clear completed</button>
        </div>
      </footer>
    </div>
  );
}

export default App;
