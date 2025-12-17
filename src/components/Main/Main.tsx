import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValues, Task } from "../../App"
import Box from '@mui/material/Box'
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import styles from './Main.module.css'
import { CustomTextField } from "../CustomTextField"
import { RoundedCheckbox } from "../RoundedCheckbox"

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
            <CustomTextField placeholder="What needs to be done?"
                name="title"
                onChange={handleTitle}
                onKeyDown={createTaskOnEnter}
                value={title}
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
                                <RoundedCheckbox checked={task.status} onChange={changeTaskStatusHandler} />
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
    )
}