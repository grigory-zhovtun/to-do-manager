import React, { useReducer } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    filter: FiltersType
}

export type FiltersType = 'all' | 'active' | 'completed'

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    // let todolistID1 = v1()
    // let todolistID2 = v1()

    // let [todolists, dispatchToTodolist] = useReducer(todolistsReducer, [
    //     { id: todolistID1, title: 'What to learn', filter: 'all' },
    //     { id: todolistID2, title: 'What to buy', filter: 'all' },
    // ])

    // let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    //     [todolistID1]: [
    //         { id: v1(), title: 'HTML&CSS', isDone: true },
    //         { id: v1(), title: 'JS', isDone: true },
    //         { id: v1(), title: 'ReactJS', isDone: false },
    //     ],
    //     [todolistID2]: [
    //         { id: v1(), title: 'Rest API', isDone: true },
    //         { id: v1(), title: 'GraphQL', isDone: false },
    //     ]
    // })
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const changeFilter = (filtersName: FiltersType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, filtersName)
        dispatch(action)
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(taskId, isDone, todolistId)
        dispatch(action)
    }
    const deleteTask = (taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId)
        dispatch(action)
    }
    const addTask = (taskTitle: string, todolistId: string) => {
        const action = addTaskAC(taskTitle, todolistId)
        dispatch(action)
    }
    const deleteTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
        // dispatchToTasks(action)
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
        // dispatchToTodolist(action)
    }
    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        const action = changeTaskTitleAC(taskId, title, todolistId)
        dispatch(action)
    }
    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        const action = changeTodolistTitleAC(todolistId, newTitle)
        dispatch(action)
    }

    return (
        <Box sx={{ flexGrow: 1 }} style={{ padding: '20px' }}>
            <Grid container spacing={2}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" component="div">
                            Todolist
                        </Typography>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            // onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container>
                        <AddItemForm addItem={addTodolist} />
                    </Grid>
                    <Grid container spacing={3}>
                        {
                            todolists.map(todolist => {
                                let allTodolistTasks = tasks[todolist.id]
                                let filteredTasks = allTodolistTasks

                                if (todolist.filter === 'active') {
                                    filteredTasks = allTodolistTasks.filter(task => task.isDone === false)
                                }
                                if (todolist.filter === 'completed') {
                                    filteredTasks = allTodolistTasks.filter(task => task.isDone === true)
                                }
                                return (
                                    <Grid>
                                        <Paper elevation={1} style={{ padding: "10px" }}>
                                            < Todolist
                                                key={todolist.id}
                                                todolistId={todolist.id}
                                                title={todolist.title}
                                                tasks={filteredTasks}
                                                deleteTask={deleteTask}
                                                changeFilter={changeFilter}
                                                addTask={addTask}
                                                changeTaskStatus={changeTaskStatus}
                                                filter={todolist.filter}
                                                deleteTodolist={deleteTodolist}
                                                changeTaskTitle={changeTaskTitle}
                                                changeTodolistTitle={changeTodolistTitle}
                                            />
                                        </Paper>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Container>
            </Grid>
        </Box>
    );
}

export default App;
