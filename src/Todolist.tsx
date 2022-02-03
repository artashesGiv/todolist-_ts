import React, {useCallback} from 'react'
import {FilterValuesType, TaskType} from './AppWithRedux'
import s from './Todolist.module.scss'
import {AddItemForm} from './components/AddItemForm/AddItemForm'
import {EditableSpan} from './components/EditableSpan/EditableSpan'
import {Button, IconButton, List} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {Task} from './Task'

type TodolistPropsType = {
   id: string
   title: string
   tasks: Array<TaskType>
   filter: FilterValuesType
   removeTask: (taskID: string, todoListID: string) => void
   changeFilter: (todoListID: string, filter: FilterValuesType) => void
   addTask: (title: string, todoListID: string) => void
   changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
   removeTodoList: (todoListID: string) => void
   changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
   changeTodolistTitle: (title: string, todoListID: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {
   const {
      id,
      title,
      tasks,
      filter,
      removeTask,
      changeTaskStatus,
      changeTaskTitle,
      changeFilter,
      addTask,
      removeTodoList,
      changeTodolistTitle,
   } = props

   let tasksFortTodolist = tasks

   if (filter === 'active') {
      tasksFortTodolist = tasks.filter(t => !t.isDone)
   }
   if (filter === 'completed') {
      tasksFortTodolist = tasks.filter(t => t.isDone)
   }

   const tasksRendered = tasksFortTodolist.map(t => {
      return (
         <Task
            key={t.id}
            todoListId={id}
            task={t}
            removeTask={removeTask}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
         />
      )
   })

   const addTaskHandler = useCallback((title: string) => {
      addTask(title, id)
   }, [addTask, id])

   const setAll = useCallback(() => changeFilter(id, 'all'), [changeFilter, id])
   const setActive = useCallback(() => changeFilter(id, 'active'), [changeFilter, id])
   const setCompleted = useCallback(() => changeFilter(id, 'completed'), [changeFilter, id])

   const allColor = filter === 'all' ? 'secondary' : 'primary'
   const activeColor = filter === 'active' ? 'secondary' : 'primary'
   const completedColor = filter === 'completed' ? 'secondary' : 'primary'

   const removeTodoListHandler = () => removeTodoList(id)

   const changeTodolistTitleHandler = useCallback((title: string) => {
      changeTodolistTitle(title, id)
   }, [changeTodolistTitle, id])

   return (
      <div className={s.todolist}>
         <div>
            <h3 className={s.title}>
               <EditableSpan title={title} setNewTitle={changeTodolistTitleHandler}/>
               <div>
                  <IconButton onClick={removeTodoListHandler}>
                     <Delete fontSize="small"/>
                  </IconButton>
               </div>
            </h3>
         </div>
         <AddItemForm addItem={addTaskHandler} placeholder={'Enter your task...'}/>
         <List>
            {tasksRendered}
         </List>
         <div className={s.sortButton}>
            <Button onClick={setAll} variant="outlined" color={allColor} size="small">All</Button>
            <Button onClick={setActive} variant="outlined" color={activeColor} size="small">Active</Button>
            <Button onClick={setCompleted} variant="outlined" color={completedColor} size="small">Completed</Button>
         </div>
      </div>
   )
})

