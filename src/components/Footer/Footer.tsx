import { FilterValues, Task } from "../../App"

type Props = {
    tasks: Task[]
    clearCompletedTasks: () => void
    filterTasks: (filter: FilterValues) => void
}

export const Footer = (props: Props) => {
    const { tasks, clearCompletedTasks, filterTasks } = props

    const countActive = () => {
        const activeTasks = tasks.filter(task => !task.status)

        return activeTasks.length
    }

    return (
        <footer className='footer-wrapper'>
            <div className='footer'>
                <span className='count'>{countActive()} items left</span>
                <div className='filters'>
                    <button type='button' onClick={() => filterTasks('all')}>All</button>
                    <button type='button' onClick={() => filterTasks('active')}>Active</button>
                    <button type='button' onClick={() => filterTasks('completed')}>Completed</button>
                </div>
                <button type='button' className='clear' onClick={clearCompletedTasks}>Clear completed</button>
            </div>
        </footer>
    )
}