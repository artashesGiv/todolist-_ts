import {FilterValuesType, TodolistType} from '../App'
import {v1} from 'uuid'

export const removeTodolistAC = (todolistId: string) => {
   return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}

export const addTodolistAC = (title: string) => {
   return {type: 'ADD-TODOLIST', title} as const
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

export type actionType =
   ReturnType<typeof removeTodolistAC>
   | ReturnType<typeof addTodolistAC>
   | ReturnType<typeof changeTodolistTitleAC>
   | ReturnType<typeof changeFilterTodolistAC>

export const todolistsReducer = (todoLists: Array<TodolistType>, action: actionType): Array<TodolistType> => {
   switch (action.type) {
      case 'REMOVE-TODOLIST':
         return todoLists.filter(tl => tl.id !== action.id)
      case 'ADD-TODOLIST':
         return [...todoLists, {id: v1(), title: action.title, filter: 'all'}]
      case 'CHANGE-TODOLIST-TITLE':
         return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
      case 'CHANGE-TODOLIST-FILTER':
         return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
      default:
         return todoLists
   }
}


