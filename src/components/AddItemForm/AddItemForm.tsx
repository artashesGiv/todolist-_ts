import s from './AddItemForm.module.scss'
import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {IconButton, TextField} from '@material-ui/core'
import {AddBox} from '@material-ui/icons'

type typeProps = {
   addItem: (title: string) => void
   placeholder?: string
}

export const AddItemForm = (props: typeProps) => {

   const [title, setTitle] = useState<string>('')
   const [error, setError] = useState<boolean>(false)

   const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false)
      setTitle(event.currentTarget.value)
   }

   const onKeyPressInput = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && addItem()

   const addItem = () => {
      const trimTitle = title.trim()
      trimTitle ? props.addItem(trimTitle) : setError(true)
      setTitle('')
   }

   return (
      <div className={s.inputWrapper}>
         <TextField
            variant='outlined'
            size='small'
            value={title}
            onChange={onChangeInput}
            onKeyPress={onKeyPressInput}
            label={props.placeholder}
            error={error}
            helperText={error && 'Title is required!'}
         />
         <div>
            <IconButton onClick={addItem}>
               <AddBox fontSize='medium' color='primary'/>
            </IconButton>
         </div>
      </div>
   )
}