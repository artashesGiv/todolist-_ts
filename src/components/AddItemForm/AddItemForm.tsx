import s from './AddItemForm.module.scss'
import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

type typeProps = {
   addItem: (title: string) => void
   placeholder?: string
}

export const AddItemForm = (props: typeProps) => {

   const [title, setTitle] = useState<string>('')
   const [error, setError] = useState<boolean>(false)
   const errorMessage = error && <div style={{color: 'crimson'}}>Title is required!</div>

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
         <input
            value={title}
            placeholder={props.placeholder}
            onChange={onChangeInput}
            onKeyPress={onKeyPressInput}
            className={error ? s.error : ''}
         />
         <button onClick={addItem} className={s.button}>+</button>
         {errorMessage}
      </div>
   )
}