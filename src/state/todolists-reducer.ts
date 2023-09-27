import { FiltersType, TodolistType } from "../App"
import { v1 } from 'uuid'

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistTitle = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilter = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FiltersType
}

export type ActionType =    RemoveTodolistAT | 
                            AddTodolistAT |
                            ChangeTodolistTitle |
                            ChangeTodolistFilter

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType):TodolistType[]  => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todolist => todolist.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, { id: action.todolistId, title: action.title, filter: 'all' }]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todolist => todolist.id === action.id
                ? { ...todolist, title: action.title }
                : todolist)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todolist => todolist.id === action.id
                ? { ...todolist, filter: action.filter }
                : todolist)
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string):RemoveTodolistAT => ({type: 'REMOVE-TODOLIST', id: todolistId})
export const addTodolistAC = (title: string):AddTodolistAT => ({type: 'ADD-TODOLIST', title: title, todolistId: v1()})
export const changeTodolistTitleAC = (todolistId: string, title: string):ChangeTodolistTitle => ({type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title})
export const changeTodolistFilterAC = (todolistId: string, filter: FiltersType):ChangeTodolistFilter => ({type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter})