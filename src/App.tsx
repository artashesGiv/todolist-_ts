import React, {useState} from 'react'
import './App.scss'
import Todolist from './Todolist'
import {v1} from 'uuid'

export type TaskType = {
   id: string
   title: string
   isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
   id: string
   title: string
   filter: FilterValuesType
}

type TasksStateType = {
   [key: string]: Array<TaskType>
}

function App() {
   // DLL: бизнес логика - state (данные и функции изменяющие их)

   //state
   const todoListID_1 = v1()
   const todoListID_2 = v1()
   const [todoList, setTodoList] = useState<Array<TodolistType>>([
      {id: todoListID_1, title: 'What to learn', filter: 'all'},
      {id: todoListID_2, title: 'What to buy', filter: 'all'},
   ])

   const [tasks, setTasks] = useState<TasksStateType>({
      [todoListID_1]: [
         {id: v1(), title: 'HTML&CSS', isDone: true},
         {id: v1(), title: 'JS', isDone: true},
         {id: v1(), title: 'React', isDone: false},
         {id: v1(), title: 'Redux', isDone: false},
      ],
      [todoListID_2]: [
         {id: v1(), title: 'Milk', isDone: true},
         {id: v1(), title: 'Bread', isDone: true},
         {id: v1(), title: 'Meat', isDone: false},
         {id: v1(), title: 'Chocolate', isDone: false},
      ],
   })

   // удаление таски
   const removeTask = (taskID: string, todoListID: string) => {
      setTasks({
         ...tasks,
         [todoListID]: tasks[todoListID].filter(t => t.id !== taskID),
      })
   }

   // добавление таски
   const addTask = (title: string, todoListID: string) => {
      const newTask: TaskType = {
         id: v1(),
         title, // title === title: title
         isDone: false,
      }
      setTasks({
         ...tasks,
         [todoListID]: [...tasks[todoListID], newTask],
      })
   }

   // изменение статуса таски
   const changeTaskStatus = (taskId: string, isDone: boolean, todoListID: string) => {
      setTasks({
         ...tasks,
         [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, isDone} : t),
      })
   }

   // изменение фильтра
   const changeFilter = (filter: FilterValuesType, todoListID: string) => {
      setTodoList(todoList.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
   }

   // удаление тудулистов
   const removeTodoList = (todoListID: string) => {
      setTodoList(todoList.filter(tl => tl.id !== todoListID))
      delete tasks[todoListID]
   }

   // добавление тудулистов
   const addTodoList = (title: string) => {
      const todoListID = v1()
      const newTodoList: TodolistType = {
         id: v1(),
         title,
         filter: 'all',
      }
      setTodoList([...todoList, newTodoList])
      setTasks({...tasks, [todoListID]: []})
   }

   //UI - интерфейс
   const todoListsComponent = todoList.map(tl => {

      let tasksForRender: Array<TaskType> = tasks[tl.id]
      if (tl.filter === 'active') {
         tasksForRender = tasks[tl.id].filter(t => !t.isDone)
      }
      if (tl.filter === 'completed') {
         tasksForRender = tasks[tl.id].filter(t => t.isDone)
      }

      return (
          <div>
             <Todolist
                 key={tl.id}
                 id={tl.id}
                 title={tl.title}
                 filter={tl.filter}
                 tasks={tasksForRender}
                 removeTask={removeTask}
                 changeFilter={changeFilter}
                 addTask={addTask}
                 changeTaskStatus={changeTaskStatus}
                 removeTodoList={removeTodoList}
             />
          </div>
      )
   })


   return <div className="App">
      {todoListsComponent}
   </div>

}

export default App