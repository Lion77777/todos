import { Task } from "../App"
import {v1} from 'uuid'

const initialState: Task[] = []

export type createTaskAction = ReturnType<typeof createTaskAC>

export const tasksReducer = (state = initialState, action: Actions) => {
    switch(action.type) {
        case 'create_task': {
            const {id, title} = action.payload
            const newTask = {id, title, status: false}

            return [newTask, ...state]
        }
    }
    
}

export const createTaskAC = (title: string) => {
    return {type: 'create_task', payload: {id: v1(), title}} as const
}

type Actions = createTaskAction