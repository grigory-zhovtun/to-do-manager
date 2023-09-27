import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    value: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = ({value, onChange}: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const onChangeHundler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const setActivateEditMode = () => {
        setEditMode(true)
        setTitle(value)
    }
    const setActivateViewMode = () => {
        setEditMode(false)
        onChange(title)
    } 
    const onPressHundler = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            setEditMode(false)
            onChange(title)
        }
    }


    return (
        editMode
        ? <TextField id="standard-basic" variant="standard"  
            onChange={onChangeHundler}
            value={title} 
            onBlur={setActivateViewMode}
            onKeyPress={onPressHundler} 
            autoFocus/>
        : <span onDoubleClick={setActivateEditMode}>{value}</span>

    );
};