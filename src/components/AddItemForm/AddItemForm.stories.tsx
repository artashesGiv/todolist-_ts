import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {AddItemForm} from './AddItemForm'
import {action} from '@storybook/addon-actions'

export default {
   title: 'TODOLIST/AddItemForm',
   component: AddItemForm,
   argTypes: {
      addItem: {
         description: 'Callback clicked inside form',
      },
      placeholder: {
         description: 'placeholder in input',
      },
   },
} as ComponentMeta<typeof AddItemForm>

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args}/>

export const AddItemFormStory = Template.bind({})
AddItemFormStory.args = {
   addItem: action('button clicked'),
   placeholder: 'Введите текст таски'
}
