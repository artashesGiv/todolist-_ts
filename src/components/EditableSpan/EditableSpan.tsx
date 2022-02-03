import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {TextField} from '@material-ui/core'

type propsType = {
   title: string
   setNewTitle: (title: string) => void
   disable?: boolean
}
export const EditableSpan = React.memo((props: propsType) => {
   const [editMode, setEditMode] = useState<boolean>(false)
   const [title, setTitle] = useState<string>('')

   const onEditMode = () => {
      if (!props.disable) {
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
            style={{width: '150px'}}
         />
         : <span onDoubleClick={onEditMode}>{props.title}</span>
   )
})