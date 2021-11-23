import React, {ChangeEvent} from 'react'
import {FilterValuesType, TaskType} from './App'
import s from './Todolist.module.scss'
import {AddItemForm} from './components/AddItemForm/AddItemForm'
import {EditableSpan} from './components/EditableSpan/EditableSpan'
import {Checkbox, IconButton, List, ListItem} from '@material-ui/core'
import {Delete} from '@material-ui/icons'

type TodolistPropsType = {
   id: string
   title: string
   tasks: Array<TaskType>
   filter: FilterValuesType
   removeTask: (taskID: string, todoListID: string) => void
   changeFilter: (filter: FilterValuesType, todoListID: string) => void
   addTask: (title: string, todoListID: string) => void
   changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
   removeTodoList: (todoListID: string) => void
   changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
   changeTodolistTitle: (title: string, todoListID: string) => void
}

const Todolist = (props: TodolistPropsType) => {

   const tasksJSXElements = props.tasks.map(task => {
      const removeTask = () => props.removeTask(task.id, props.id)
      const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
      const changeTitle = (title: string) => {
         props.changeTaskTitle(task.id, title, props.id)
      }
      return (
         <ListItem
            key={task.id}
            disableGutters
            divider
            className={task.isDone ? `${s.listEl} ${s.isDone}` : s.listEl}
            style={{display: 'flex', justifyContent: 'space-between', padding: '0'}}
         >
            <Checkbox
               onChange={changeTaskStatus}
               checked={task.isDone}
               size="small"
               color="primary"
            />
            <EditableSpan title={task.title} setNewTitle={changeTitle} isDone={task.isDone}/>
            <IconButton onClick={removeTask}>
               <Delete/>
            </IconButton>
         </ListItem>
      )
   })

   const addTask = (title: string) => {
      props.addTask(title, props.id)
   }

   const setAll = () => props.changeFilter('all', props.id)
   const setActive = () => props.changeFilter('active', props.id)
   const setCompleted = () => props.changeFilter('completed', props.id)

   const allBtnClass = props.filter === 'all' ? s.activeFilter : ''
   const activeBtnClass = props.filter === 'active' ? s.activeFilter : ''
   const completedBtnClass = props.filter === 'completed' ? s.activeFilter : ''

   const removeTodoList = () => props.removeTodoList(props.id)

   const changeTodolistTitle = (title: string) => {
      props.changeTodolistTitle(title, props.id)
   }

   return (
      <div className={s.todolist}>
         <div>
            <h3 className={s.title}>
               <EditableSpan title={props.title} setNewTitle={changeTodolistTitle}/>
               <div>
                  <IconButton onClick={removeTodoList}>
                     <Delete fontSize="small"/>
                  </IconButton>
               </div>
            </h3>
         </div>
         <AddItemForm addItem={addTask} placeholder={'Enter your task...'}/>
         <List>
            {tasksJSXElements}
         </List>
         <div className={s.sortButton}>
            <button onClick={setAll} className={allBtnClass}>All</button>
            <button onClick={setActive} className={activeBtnClass}>Active</button>
            <button onClick={setCompleted} className={completedBtnClass}>Completed</button>
         </div>
      </div>
   )
}

export default Todolist