import React from 'react'
import {Provider} from 'react-redux'
import {v1} from 'uuid'
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from './tasksReducer'
import {todolistsReducer} from './todolistsReducer'

const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReducer,
})

const initialGlobalState = {
   todolists: [
      {id: 'todolistId1', title: 'What to learn', filter: 'all'},
      {id: 'todolistId2', title: 'What to buy', filter: 'all'},
   ],
   tasks: {
      ['todolistId1']: [
         {id: v1(), title: 'HTML&CSS', isDone: false},
         {id: v1(), title: 'JS', isDone: true},
      ],
      ['todolistId2']: [
         {id: v1(), title: 'Milk', isDone: false},
         {id: v1(), title: 'React Book', isDone: true},
      ],
   },
}

class AppRootStateType {
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoryProviderDecorator = (storyFn: () => React.ReactNode) => {
   return <Provider store={storyBookStore}>{storyFn()}</Provider>
}