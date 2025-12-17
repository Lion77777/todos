import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValues, Task } from "../../App"
import Box from '@mui/material/Box'
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import styles from './Main.module.css'

type Props = {
    createTask: (title: string) => void
    tasks: Task[]
    changeTaskStatus: (id: string, status: boolean) => void
    filter: FilterValues
}

export const Main = (props: Props) => {
    const { createTask, tasks, changeTaskStatus, filter } = props
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError('')
    }

    const createTaskHandler = () => {
        const trimmedTitle = title.trim()

        if (trimmedTitle) {
            createTask(trimmedTitle)
        } else {
            setError('Please enter task title')
        }

        setTitle('')
    }

    const createTaskOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            createTaskHandler()
        }
    }

    const showTaskAbsentMessage = (filter: string) => {
        if (filter === 'active' && tasks.length === 0) {
            return (<p className='tasks-absent'>No active tasks</p>)
        }
        if (filter === 'completed' && tasks.length === 0) {
            return (<p className='tasks-absent'>No completed tasks</p>)
        }
        if (filter === 'all' && tasks.length === 0) {
            return (<p className='tasks-absent'>There are no tasks</p>)
        }

        return ''
    }

    return (
        <Box className={styles.wrapper} >

            <input type='text'
                name='title'
                value={title}
                onChange={handleTitle}
                onKeyDown={createTaskOnEnter}
                className={error ? 'title-input-error title-input' : 'title-input'}
                placeholder='What needs to be done?'
            />
            {error &&
                <Typography variant="body2" color="error" className={styles.errorMessage}>
                    {error}
                </Typography>
            }
            <List className={styles.tasksList}>
                {
                    showTaskAbsentMessage(filter) ||
                    tasks.map(task => {
                        const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(task.id, event.target.checked)
                        }

                        return (
                            <ListItem key={task.id} className={styles.taskItem} sx={{ paddingLeft: "60px" }}>
                            <input type='checkbox' name='status' onChange={changeTaskStatusHandler} className='task-item_rounded-checkbox' checked={task.status} />
                                
                                <Typography className={task.status ? styles.checked : styles.taskItemTitle}
                                    sx={{ fontSize: "20px" }}>
                                    {task.title}
                                </Typography>
                            </ListItem>
                        )
                    })
                }
            </List>
        </Box>
        // <div className='wrapper'>
        // <input type='text'
        //     name='title'
        //     value={title}
        //     onChange={handleTitle}
        //     onKeyDown={createTaskOnEnter}
        //     className={error ? 'title-input-error title-input' : 'title-input'}
        //     placeholder='What needs to be done?'
        // />
        //     {error && <p className='error-message'>{error}</p>}
        //     <ul className='task-list'>
        //         {
        //             showTaskAbsentMessage(filter) ||
        //             tasks.map(task => {
        //                 const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        //                     changeTaskStatus(task.id, e.currentTarget.checked)
        //                 }

        //                 return <li className='task-item' key={task.id}>
                            // <input type='checkbox' name='status' onChange={changeTaskStatusHandler} className='task-item_rounded-checkbox' checked={task.status} />
        //                     <span className='task-item_title'>{task.title}</span>
        //                 </li>
        //             })
        //         }
        //     </ul>
        // </div>
    )
}