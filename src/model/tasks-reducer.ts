import { Task } from "../App"
import {v1} from 'uuid'

const initialState: Task[] = []



export const tasksReducer = (state = initialState, action: Actions) => {
    switch(action.type) {
        case 'create_task': {
            const {id, title} = action.payload
            const newTask = {id, title, status: false}

            return [newTask, ...state]
        }
        case 'change_task_status': {
            const {id, status} = action.payload
            const updatedTasks = state.map(task => task.id === id ? {...task, status} : task)

            return [...updatedTasks]
        }
        case 'clear_completed_tasks': {
            const updatedTasks = state.filter(task => task.status !== action.payload.status)

            return [...updatedTasks]
        }
    }
    
}

export const createTaskAC = (title: string) => {
    return {type: 'create_task', payload: {id: v1(), title}} as const
}

export const changeTaskStatusAC = (payload: {id: string, status: boolean}) => {
    return {type: 'change_task_status', payload} as const
}

export const clearCompletedTasksAC = (status: boolean) => {
    return {type: 'clear_completed_tasks', payload: {status}} as const
}


export type createTaskAction = ReturnType<typeof createTaskAC>
export type changeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
export type clearCompletedTasksAction = ReturnType<typeof clearCompletedTasksAC>

type Actions = createTaskAction | changeTaskStatusAction | clearCompletedTasksAction