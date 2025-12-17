import { useReducer, useState } from 'react';
import './App.css';
import { changeTaskStatusAC, clearCompletedTasksAC, createTaskAC, tasksReducer } from './model/tasks-reducer';
import { v1 } from 'uuid';
import { Main } from './components/Main';
import { Footer } from './components/Footer';

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

  if (filter === 'active') {
    filteredTasks = tasks.filter(task => !task.status)
  }
  if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.status)
  }

  const clearCompletedTasks = () => {
    dispatchTasks(clearCompletedTasksAC(true))
  }

  const filterTasks = (filter: FilterValues) => {
    setFilter(filter)
  }

  return (
    <div className='container'>
      <h1>todos</h1>
      <Main createTask={createTask} tasks={filteredTasks} changeTaskStatus={changeTaskStatus} filter={filter} />
      <Footer tasks={filteredTasks} clearCompletedTasks={clearCompletedTasks} filterTasks={filterTasks} />
    </div>
  );
}

export default App;
