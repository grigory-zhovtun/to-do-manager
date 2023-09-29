import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import { FiltersType, TaskType } from './App';
import './App.css';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import { Task } from './Task';


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

export const Todolist = React.memo( ({
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

    console.log('Todolist called')
    let [taskTitle, setTasksTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const deleteTaskHundler = useCallback( (taskId: string) => {
        deleteTask(taskId, todolistId)
    }, [deleteTask, todolistId])
    const onChangeTitle = useCallback( (taskId: string, newTitle: string) => {
        changeTaskTitle(taskId, newTitle, todolistId)
    }, [changeTaskTitle, todolistId])
    const changeFilterHundler = (filter: FiltersType) => {
        changeFilter(filter, todolistId)
    }
    const onChangeHundler = (e: ChangeEvent<HTMLInputElement>) => {
        setTasksTitle(e.currentTarget.value)
        setError(null)
    }
    const onChangeTaskStatus = useCallback( (taskId: string, isDone: boolean) => {
        changeTaskStatus(taskId, isDone, todolistId)
    }, [changeTaskStatus, todolistId])
    const onChangeTodolistTitle = useCallback( (newTitle: string) => {
        changeTodolistTitle(newTitle, todolistId)
    }, [changeTodolistTitle, todolistId])
    const addTaskHundler = useCallback( (title: string) => {
        if (title.trim() !== '') {
            addTask(title.trim(), todolistId)
            setTasksTitle('')
        } else {
            setError("Task can't be empty")
        }
    }, [addTask, todolistId] )
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

    let filteredTasks = tasks

    if (filter === 'active') {
        filteredTasks = tasks.filter(task => task.isDone === false)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.isDone === true)
    }

    const TaskComponent = filteredTasks.map(task => {
        return (
            <Task 
                    task={task}
                    onChangeTaskStatus={onChangeTaskStatus}
                    onChangeTitle={onChangeTitle} 
                    deleteTaskHundler={deleteTaskHundler}/>
        )
    })

    const onAllClickHundler = useCallback( () => changeFilterHundler('all'), [changeFilterHundler])
    const onActiveClickHundler = useCallback(() => changeFilterHundler('active'), [changeFilterHundler])
    const onCompletedClickHundler = useCallback(() => changeFilterHundler('completed'), [changeFilterHundler])

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
                    onClick={onAllClickHundler}>All</Button>
                <Button 
                    color='primary'
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHundler}>Active</Button>
                <Button 
                    color='secondary'
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHundler}>Completed</Button>
            </ButtonGroup>
        </div>
    );
})