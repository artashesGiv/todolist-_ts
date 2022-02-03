import {FilterValuesType, TodolistType} from '../AppWithRedux'
import {v1} from 'uuid'

export const removeTodolistAC = (todolistID: string) => {
   return {type: 'REMOVE-TODOLIST', todolistID} as const
}

export const addTodolistAC = (title: string) => {
   return {type: 'ADD-TODOLIST', title, todolistID: v1()} as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
   return {
      type: 'CHANGE-TODOLIST-TITLE',
      id,
      title,
   } as const
}

export const changeFilterTodolistAC = (id: string, filter: FilterValuesType) => {
   return {
      type: 'CHANGE-TODOLIST-FILTER',
      id,
      filter,
   } as const
}

type actionType =
   ReturnType<typeof removeTodolistAC>
   | ReturnType<typeof addTodolistAC>
   | ReturnType<typeof changeTodolistTitleAC>
   | ReturnType<typeof changeFilterTodolistAC>


export const todoListID_1 = v1()
export const todoListID_2 = v1()

const initialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initialState, action: actionType): TodolistType[] => {
   switch (action.type) {
      case 'REMOVE-TODOLIST':
         return state.filter(tl => tl.id !== action.todolistID)
      case 'ADD-TODOLIST':
         return [{id: action.todolistID, title: action.title, filter: 'all'}, ...state]
      case 'CHANGE-TODOLIST-TITLE':
         return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
      case 'CHANGE-TODOLIST-FILTER':
         return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
      default:
         return state
   }
}



