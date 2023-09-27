import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FiltersType, TaskType } from './App';
import './App.css';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Checkbox from '@mui/material/Checkbox';


type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    filter: FiltersType
    deleteTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FiltersType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
    deleteTodolist: (todolistId: string) => void
}

export const Todolist = ({
    todolistId,
    title,
    tasks,
    deleteTask,
    changeFilter,
    addTask,
    changeTaskStatus,
    changeTaskTitle,
    changeTodolistTitle,
    filter,
    deleteTodolist
}: TodolistPropsType) => {

    let [taskTitle, setTasksTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const deleteTaskHundler = (taskId: string) => {
        deleteTask(taskId, todolistId)
    }
    const onChangeTitle = (taskId: string, newTitle: string) => {
        changeTaskTitle(taskId, newTitle, todolistId)
    }
    const changeFilterHundler = (filter: FiltersType) => {
        changeFilter(filter, todolistId)
    }
    const onChangeHundler = (e: ChangeEvent<HTMLInputElement>) => {
        setTasksTitle(e.currentTarget.value)
        setError(null)
    }
    const onChangeTaskStatus = (taskId: string, isDone: boolean) => {
        changeTaskStatus(taskId, isDone, todolistId)
    }
    const onChangeTodolistTitle = (newTitle: string) => {
        changeTodolistTitle(newTitle, todolistId)
    }
    const addTaskHundler = (title: string) => {
        if (title.trim() !== '') {
            addTask(title.trim(), todolistId)
            setTasksTitle('')
        } else {
            setError("Task can't be empty")
        }
    }
    const addTaskByPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (taskTitle.trim() !== '') {
                addTask(taskTitle.trim(), todolistId)
                setTasksTitle('')
            } else {
                setError("Task can't be empty")
            }
        }
    }
    const deleteTodolistHundler = () => {
        deleteTodolist(todolistId)
    }

    const TaskComponent = tasks.map(task => {
        return (
            <li key={task.id} className={task.isDone 
                    ? 'is-done' 
                    : ''}
            >
                <Checkbox 
                    size="small"  
                    color="secondary"
                    checked={task.isDone}
                    onChange={() => onChangeTaskStatus(task.id, !task.isDone)}
                />

                <EditableSpan value={task.title} onChange={(newValue: string) => onChangeTitle(task.id, newValue)} />
                <IconButton aria-label="delete" size="small">
                    <DeleteIcon onClick={() => deleteTaskHundler(task.id)} fontSize="small" />
                </IconButton>
            </li>
        )
    })

    return (
        <div>
            <h3> <EditableSpan value={title}
                onChange={onChangeTodolistTitle}
            />
                <IconButton onClick={deleteTodolistHundler} aria-label="delete" size="small">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHundler} />
            <ul>
                {TaskComponent}
            </ul>
            <ButtonGroup variant="text" aria-label="text button group">
                <Button 
                    color='inherit'
                    variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={() => changeFilterHundler('all')}>All</Button>
                <Button 
                    color='primary'
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={() => changeFilterHundler('active')}>Active</Button>
                <Button 
                    color='secondary'
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={() => changeFilterHundler('completed')}>Completed</Button>
            </ButtonGroup>
        </div>
    );
};