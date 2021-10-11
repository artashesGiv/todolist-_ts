import React from 'react'
import './App.css'
import Todolist from './Todolist'

export type TaskType = {
   id: number
   title: string
   isDone: boolean
}

function App() {

   const tasks_1: Array<TaskType> = [                 // TaskType []
      {id: 1, title: 'HTML&CSS', isDone: true},
      {id: 2, title: 'JS', isDone: true},
      {id: 3, title: 'React', isDone: false},
      {id: 4, title: 'Redux', isDone: false},
   ]

   return <div className='App'>
      <Todolist
         title={'What to learn'}
         tasks={tasks_1}
      />
      {/*<Todolist title={'What to buy'}/>*/}
      {/*<Todolist title={'What to read'}/>*/}
   </div>

}

export default App