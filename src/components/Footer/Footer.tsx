import { FilterValues, Task } from "../../App"
import Box from '@mui/material/Box'
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import styles from './Footer.module.css'

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
        <Box className={styles.footerWrapper}>
            <Paper className={styles.footer}
                sx={{
                    borderRadius: 0,
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.5)"
                }}
            >
                <Box sx={{ color: "text.secondary" }}>{countActive()} items left</Box>
                <Box className={styles.filters}>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => filterTasks('all')}
                        sx={{ textTransform: "none" }}
                    >
                        All
                    </Button>
                    <Button
                        size="small"
                        variant="text"
                        onClick={() => filterTasks('active')}
                        sx={{ textTransform: "none" }}
                    >
                        Active
                    </Button>
                    <Button
                        size="small"
                        variant="text"
                        onClick={() => filterTasks('completed')}
                        sx={{ textTransform: "none" }}
                    >
                        Completed
                    </Button>
                </Box>
                <Button
                    size="small"
                    variant="text"
                    onClick={clearCompletedTasks}
                    sx={{
                        textTransform: "none",
                        color: "text.secondary",
                    }}
                >
                    Clear completed
                </Button>
            </Paper>
        </Box>
    )
}