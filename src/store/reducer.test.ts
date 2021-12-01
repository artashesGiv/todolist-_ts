import {actionType, calculate} from './reducer'

test('sum of calculator', () => {
   const num1 = 10
   const num2 = 12

   const action: actionType = {
      type: 'SUM', number: num2,
   }

   const result = calculate(num1, action)

   expect(result).toBe(22)
})