import React from 'react'
import { EditableSpan } from './EditableSpan'

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { TaskType } from './AppWithRedux';

type TaskPropsType = {
    task: TaskType
    onChangeTaskStatus: (taskId: string, isDone: boolean) => void
    onChangeTitle: (taskId: string, newValue: string) => void
    deleteTaskHundler: (taskId: string) => void
}

export const Task = React.memo( ({task, onChangeTaskStatus, onChangeTitle, deleteTaskHundler}: TaskPropsType) => {
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
