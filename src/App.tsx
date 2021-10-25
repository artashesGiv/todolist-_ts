import React, {useState} from 'react'
import './App.css'
import Todolist from './Todolist'
import {v1} from 'uuid'

export type TaskType = {
   id: string
   title: string
   isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

   // DLL: бизнес логика - state (данные и функции изменяющие их)
   const [tasks, setTasks] = useState<Array<TaskType>>([
         {id: v1(), title: 'HTML&CSS', isDone: true},
         {id: v1(), title: 'JS', isDone: true},
         {id: v1(), title: 'React', isDone: false},
         {id: v1(), title: 'Redux', isDone: false},
      ]
   )
   const [filter, setFilter] = useState<FilterValuesType>('all')

   const removeTask = (taskID: string) => setTasks(tasks.filter(t => t.id !== taskID))

   const changeFilter = (filter: FilterValuesType) => setFilter(filter)

   const addTask = (title: string) => {
      const newTask: TaskType = {
         id: v1(),
         title, // title === title: title
         isDone: false,
      }
      setTasks([...tasks, newTask])
   }

   //UI - интерфейс
   let tasksForRender = tasks
   if (filter === 'active') {
      tasksForRender = tasks.filter(t => !t.isDone)
   }
   if (filter === 'completed') {
      tasksForRender = tasks.filter(t => t.isDone)
   }

   return <div className="App">
      <Todolist
         title={'What to learn'}
         tasks={tasksForRender}
         removeTask={removeTask}
         changeFilter={changeFilter}
         addTask={addTask}
      />
   </div>

}

export default App