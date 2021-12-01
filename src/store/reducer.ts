export type actionType = {
   type: 'SUM' | 'MULT' | 'SUB' | 'DIV'
   number: number
}

export const calculate = (state: number, action: actionType) => {
   switch (action.type) {
      case 'SUM':
         return state + action.number
      case 'MULT':
         return state * action.number
      case 'SUB':
         return state - action.number
      case 'DIV':
         return state / action.number
      default:
         return state
   }
}