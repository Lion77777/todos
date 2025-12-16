import { v1 } from "uuid"
import { changeTaskStatusAC, clearCompletedTasksAC, createTaskAC, tasksReducer } from "../tasks-reducer"
import { Task } from "../../App"

let startState: Task[]

beforeEach(() => {
    startState = [
        { id: v1(), status: false, title: 'Тестовое задание' },
        { id: v1(), status: true, title: 'Прекрасный код' },
        { id: v1(), status: false, title: 'Покрытие тестами' }
    ]
})

test('correct task should be created', () => {
    const title = "New Task"

    const endState = tasksReducer(startState, createTaskAC(title))

    expect(endState.length).toBe(4)
    expect(endState[0].title).toBe(title)
})

test('correct task should change its status', () => {
    const id = startState[0].id
    const endState = tasksReducer(startState, changeTaskStatusAC({ id, status: true }))

    expect(endState[0].status).toBeTruthy()
    expect(endState.length).toBe(startState.length)
})

test('clear completed tasks', () => {
    const endState = tasksReducer(startState, clearCompletedTasksAC(true))

    expect(endState.length).toBe(2)
    expect(endState[1].status).toBeFalsy()
})