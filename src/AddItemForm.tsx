import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { AddBox } from '@mui/icons-material';


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({ addItem }: AddItemFormPropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHundler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const addItemHundler = () => {
        if (title.trim() !== '') {
            addItem(title.trim())
            setTitle('')
        } else {
            setError("Field can't be empty")
        }
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (title.trim() !== '') {
                addItem(title.trim())
                setTitle('')
            } else {
                setError("Field can't be empty")
            }
        }
    }

    return (

        <div>
            <TextField id="standard-basic" variant="standard"
                value={title}
                onChange={onChangeHundler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                label='Title'
                helperText={error}
            // className={error ? 'error': ''}
            />
            {/* <Button
                variant="outlined"
                style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                onClick={addItemHundler}
            >+</Button> */}
            <IconButton 
                color="primary"
                onClick={addItemHundler}>
                <AddBox />
            </IconButton>
            {/* {error && <div className="error-message">{error}</div>} */}
        </div>
    );
};
