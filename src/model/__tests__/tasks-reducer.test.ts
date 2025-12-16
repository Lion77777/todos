import { v1 } from "uuid"
import { createTaskAC, tasksReducer } from "../tasks-reducer"
import { Task } from "../../App"

test('correct task should be created', () => {
    const startState: Task[] = [
        { id: v1(), status: false, title: 'Тестовое задание' },
        { id: v1(), status: true, title: 'Прекрасный код' },
        { id: v1(), status: false, title: 'Покрытие тестами' }
    ]

    const title = "New Task"

    const endState = tasksReducer(startState, createTaskAC(title))

    expect(endState.length).toBe(4)
    expect(endState[0].title).toBe(title)
})