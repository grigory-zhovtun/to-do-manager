import { FiltersType, TaskType, TasksStateType, TodolistType } from "../App"
import { v1 } from 'uuid'
import { AddTodolistAT, RemoveTodolistAT } from "./todolists-reducer"

export type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskAT = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}
export type ActionType =    RemoveTaskAT |
                            AddTaskAT |
                            ChangeTaskStatusAT |
                            ChangeTaskTitleAT |
                            AddTodolistAT |
                            RemoveTodolistAT

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            const stateCopy = { ...state }
            stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(task => task.id !== action.taskId)
            return stateCopy
        case 'ADD-TASK':
            const newTask: TaskType = { id: v1(), title: action.title, isDone: false }
            return { ...state, [action.todolistId]: [newTask, ...state[action.todolistId]] }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId
                    ? { ...task, isDone: action.isDone }
                    : task)
            }
        case 'CHANGE-TASK-TITLE':
            return {
               ...state, [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId
                   ? {...task, title: action.title }
                    : task)
            }
        case 'ADD-TODOLIST':
            return {
              ...state, [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST': {
            const stateCopy = { ...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => ({ type: 'REMOVE-TASK', taskId: taskId, todolistId } as const)
export const addTaskAC = (title: string, todolistId: string) => ({ type: 'ADD-TASK', title, todolistId } as const)
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => ({ type: 'CHANGE-TASK-STATUS', taskId: taskId, isDone, todolistId } as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({ type: 'CHANGE-TASK-TITLE', taskId: taskId, title: title, todolistId: todolistId } as const)