import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterValuesType, TaskType} from './App'
import s from './Todolist.module.css'

type TodolistPropsType = {
   title: string
   tasks: Array<TaskType>
   removeTask: (taskID: string) => void
   changeFilter: (filter: FilterValuesType) => void
   addTask: (title: string) => void
}

function Todolist(props: TodolistPropsType) {

   const [title, setTitle] = useState<string>('')

   const tasksJSXElements = props.tasks.map(task => {
      const removeTask = () => props.removeTask(task.id)
      return (
         <li key={task.id} className={s.input}>
            <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
            <button onClick={removeTask}>x</button>
         </li>
      )
   })

   const addTask = () => {
      const trimTitle = title.trim()
      trimTitle && props.addTask(trimTitle)
      setTitle('')
   }

   const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
   const onKeyPressInput = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && addTask()

   const setAll = () => props.changeFilter('all')
   const setActive = () => props.changeFilter('active')
   const setCompleted = () => props.changeFilter('completed')

   return <div className={s.todolist}>
      <h3>{props.title}</h3>
      <div>
         <input
            value={title}
            placeholder="Enter your task..."
            onChange={onChangeInput}
            onKeyPress={onKeyPressInput}
         />
         <button onClick={addTask} className={s.button}>+</button>
      </div>
      <ul className={s.list}>
         {tasksJSXElements}
      </ul>
      <div className={s.sortButton}>
         <button onClick={setAll}>All</button>
         <button onClick={setActive}>Active</button>
         <button onClick={setCompleted}>Completed</button>
      </div>
   </div>
}

export default Todolist