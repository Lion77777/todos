import { useReducer, useState } from 'react';
import './App.css';
import { changeTaskStatusAC, clearCompletedTasksAC, createTaskAC, tasksReducer } from './model/tasks-reducer';
import { v1 } from 'uuid';
import { Main } from './components/Main';

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
  const [filter, setFilter] = useState<FilterValues>('all')
  let filteredTasks = tasks

  const createTask = (title: string) => {
    dispatchTasks(createTaskAC(title))
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

  const clearCompletedTasks = () => {
    dispatchTasks(clearCompletedTasksAC(true))
  }

  return (
    <div className='container'>
      <h1>todos</h1>
      <Main createTask={createTask} tasks={filteredTasks} changeTaskStatus={changeTaskStatus} filter={filter} />
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
