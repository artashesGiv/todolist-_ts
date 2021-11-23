import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {TextField} from '@material-ui/core'

type propsType = {
   title: string
   setNewTitle: (title: string) => void
   isDone?: boolean
}
export const EditableSpan = (props: propsType) => {
   const [editMode, setEditMode] = useState<boolean>(false)
   const [title, setTitle] = useState<string>('')

   const onEditMode = () => {
      if (!props.isDone) {
         setEditMode(true)
         setTitle(props.title)
      }
   }

   const offEditMode = () => {
      props.setNewTitle(title)
      setEditMode(false)
   }

   const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
      setTitle(event.currentTarget.value)
   }

   const onKeyPressInput = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && offEditMode()

   return (
      editMode
         ? <TextField
            value={title}
            autoFocus
            onBlur={offEditMode}
            onChange={onChangeInput}
            onKeyPress={onKeyPressInput}
         />
         : <span onDoubleClick={onEditMode}>{props.title}</span>
   )
}