import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton, ListItem} from '@material-ui/core'
import s from './Todolist.module.scss'
import {EditableSpan} from './components/EditableSpan/EditableSpan'
import {Delete} from '@material-ui/icons'
import {TaskType} from './AppWithRedux'

type TaskPropsType = {
   todoListId: string
   task: TaskType
   removeTask: (taskID: string, todoListID: string) => void
   changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
   changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

   const {
      todoListId,
      task,
      removeTask,
      changeTaskStatus,
      changeTaskTitle,
   } = props

   const removeTaskHandler = () => removeTask(task.id, todoListId)
   const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, todoListId)
   const changeTitleHandler = useCallback((title: string) => changeTaskTitle(task.id, title, todoListId), [task.id, changeTaskTitle, todoListId])

   return (
      <ListItem
         key={task.id}
         disableGutters
         divider
         className={task.isDone ? `${s.listEl} ${s.isDone}` : s.listEl}
         style={{display: 'flex', justifyContent: 'space-between', padding: '0'}}
      >
         <Checkbox
            onChange={changeTaskStatusHandler}
            checked={task.isDone}
            size="small"
            color="primary"
         />
         <EditableSpan title={task.title} setNewTitle={changeTitleHandler} disable={task.isDone}/>
         <IconButton onClick={removeTaskHandler}>
            <Delete/>
         </IconButton>
      </ListItem>
   )
})