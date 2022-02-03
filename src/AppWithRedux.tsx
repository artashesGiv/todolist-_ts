import React, {useCallback} from 'react'
import {Todolist} from './Todolist'
import {AddItemForm} from './components/AddItemForm/AddItemForm'
import {AppBar, IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {
   addTodolistAC,
   changeFilterTodolistAC,
   changeTodolistTitleAC,
   removeTodolistAC,
} from './store/todolistsReducer'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './store/tasksReducer'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootState} from './store/store'

export type TaskType = {
   id: string
   title: string
   isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
   id: string
   title: string
   filter: FilterValuesType
}

export type TasksStateType = {
   [key: string]: TaskType[]
}

function AppWithRedux() {
   const dispatch = useDispatch()
   const todolists = useSelector<AppRootState, TodolistType[]>(state => state.todolists)
   const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

   // удаление таски
   const removeTask = useCallback((taskID: string, todoListID: string) => {
      dispatch(removeTaskAC(taskID, todoListID))
   }, [dispatch])

   // добавление таски
   const addTask = useCallback((title: string, todoListID: string) => {
      dispatch(addTaskAC(title, todoListID))
   }, [dispatch])


   // изменение статуса таски
   const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todoListID: string) => {
      dispatch(changeTaskStatusAC(taskId, isDone, todoListID))
   }, [dispatch])

   // изменение title task
   const changeTaskTitle = useCallback((taskId: string, title: string, todoListID: string) => {
      dispatch(changeTaskTitleAC(taskId, title, todoListID))
   }, [dispatch])

   // изменение filter
   const changeFilter = useCallback((todoListID: string, filter: FilterValuesType) => {
      dispatch(changeFilterTodolistAC(todoListID, filter))
   }, [dispatch])

   // изменение title todolist
   const changeTodolistTitle = useCallback((todoListID: string, title: string) => {
      dispatch(changeTodolistTitleAC(todoListID, title))
   }, [dispatch])

   // удаление тудулистов
   const removeTodoList = useCallback((todoListID: string) => {
      dispatch(removeTodolistAC(todoListID))
   }, [dispatch])

   // добавление тудулистов
   const addTodoList = useCallback((title: string) => {
      dispatch(addTodolistAC(title))
   }, [dispatch]) // IDE попросил добвить dispatch в зависимости

   //UI - интерфейс
   const todoListsComponent = todolists.map(tl => {

      let tasksForRender: TaskType[] = tasks[tl.id]

      return (
         <Grid key={tl.id} item>
            <Paper elevation={8}>
               <Todolist
                  id={tl.id}
                  title={tl.title}
                  filter={tl.filter}
                  tasks={tasksForRender}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}
                  removeTodoList={removeTodoList}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
               />
            </Paper>
         </Grid>
      )
   })

   return (
      <>
         <AppBar position="sticky">
            <Toolbar style={{justifyContent: 'space-between'}}>
               <IconButton edge="start" color="inherit" aria-label="menu">
                  <Menu/>
               </IconButton>
               <Typography variant="h6">
                  TodoList
               </Typography>
               <Button color="inherit" variant={'outlined'}>Login</Button>
            </Toolbar>
         </AppBar>
         <Container fixed>
            <Grid container style={{padding: '30px 0'}}>
               <AddItemForm addItem={addTodoList} placeholder={'Enter your todolist...'}/>
            </Grid>
            <Grid container spacing={4}>
               {todoListsComponent}
            </Grid>
         </Container>
      </>
   )
}

export default AppWithRedux