import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterValuesType, TaskType} from './App'
import s from './Todolist.module.scss'

type TodolistPropsType = {
   title: string
   tasks: Array<TaskType>
   filter: FilterValuesType
   removeTask: (taskID: string) => void
   changeFilter: (filter: FilterValuesType) => void
   addTask: (title: string) => void
   changeTaskStatus: (taskId: string, isDone: boolean) => void
}

function Todolist(props: TodolistPropsType) {

   const [title, setTitle] = useState<string>('')
   const [error, setError] = useState<boolean>(false)

   const tasksJSXElements = props.tasks.map(task => {
      const removeTask = () => props.removeTask(task.id)
      const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)
      return (
         <li key={task.id} className={task.isDone ? `${s.listEl} ${s.isDone}` : s.listEl}>
            <input
               onChange={changeStatus}
               type="checkbox"
               checked={task.isDone}
            />
            <span>{task.title}</span>
            <button onClick={removeTask}>x</button>
         </li>
      )
   })

   const addTask = () => {
      const trimTitle = title.trim()
      trimTitle ? props.addTask(trimTitle) : setError(true)
      setTitle('')
   }

   const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
      setTitle(event.currentTarget.value)
      setError(false)
   }
   const onKeyPressInput = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && addTask()

   const setAll = () => props.changeFilter('all')
   const setActive = () => props.changeFilter('active')
   const setCompleted = () => props.changeFilter('completed')
   const errorMessage = error && <div style={{color: 'crimson'}}>Title is required!</div>

   const allBtnClass = props.filter === 'all' ? s.activeFilter : ''
   const activeBtnClass = props.filter === 'active' ? s.activeFilter : ''
   const completedBtnClass = props.filter === 'completed' ? s.activeFilter : ''

   return <div className={s.todolist}>
      <h3>{props.title}</h3>
      <div>
         <input
            value={title}
            placeholder="Enter your task..."
            onChange={onChangeInput}
            onKeyPress={onKeyPressInput}
            className={error ? s.error : ''}
         />
         <button onClick={addTask} className={s.button}>+</button>
         {errorMessage}
      </div>
      <ul className={s.list}>
         {tasksJSXElements}
      </ul>
      <div className={s.sortButton}>
         <button onClick={setAll} className={allBtnClass}>All</button>
         <button onClick={setActive} className={activeBtnClass}>Active</button>
         <button onClick={setCompleted} className={completedBtnClass}>Completed</button>
      </div>
   </div>
}

export default Todolist