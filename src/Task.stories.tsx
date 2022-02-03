import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {Task} from './Task'
import {action} from '@storybook/addon-actions'

export default {
   title: 'TODOLIST/Task',
   component: Task,
   args: {
      todoListId: '1',
      removeTask: action('remove task'),
      changeTaskStatus: action('change status'),
      changeTaskTitle: action('change title'),
   },
} as ComponentMeta<typeof Task>

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>

export const TaskIsDoneStory = Template.bind({})
TaskIsDoneStory.args = {
   task: {id: '1', title: 'JS', isDone: true},
}

export const TaskIsNotDoneStory = Template.bind({})
TaskIsNotDoneStory.args = {
   task: {id: '2', title: 'JS', isDone: false},
}