import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterValuesType, TaskType} from './App'
import s from './Todolist.module.scss'

type TodolistPropsType = {
   key: string
   id: string
   title: string
   tasks: Array<TaskType>
   filter: FilterValuesType
   removeTask: (taskID: string, todoListID: string) => void
   changeFilter: (filter: FilterValuesType, todoListID: string) => void
   addTask: (title: string, todoListID: string) => void
   changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
   removeTodoList: (todoListID: string) => void
}

const Todolist = (props: TodolistPropsType) => {

   const [title, setTitle] = useState<string>('')
   const [error, setError] = useState<boolean>(false)

   const tasksJSXElements = props.tasks.map(task => {
      const removeTask = () => props.removeTask(task.id, props.id)
      const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
      return (
          <li key={task.id} className={task.isDone ? `${s.listEl} ${s.isDone}` : s.listEl}>
             <input
                 onChange={changeTaskStatus}
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
      trimTitle ? props.addTask(trimTitle, props.id) : setError(true)
      setTitle('')
   }

   const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
      setTitle(event.currentTarget.value)
      setError(false)
   }
   const onKeyPressInput = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && addTask()

   const setAll = () => props.changeFilter('all', props.id)
   const setActive = () => props.changeFilter('active', props.id)
   const setCompleted = () => props.changeFilter('completed', props.id)
   const errorMessage = error && <div style={{color: 'crimson'}}>Title is required!</div>

   const allBtnClass = props.filter === 'all' ? s.activeFilter : ''
   const activeBtnClass = props.filter === 'active' ? s.activeFilter : ''
   const completedBtnClass = props.filter === 'completed' ? s.activeFilter : ''

   const removeTodoList = () => props.removeTodoList(props.id)

   return (
       <div className={s.todolist}>
          <h3>
             {props.title}
             <button onClick={removeTodoList}>x</button>
          </h3>
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
   )
}

export default Todolist