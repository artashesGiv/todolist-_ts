import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {EditableSpan} from './EditableSpan'
import {action} from '@storybook/addon-actions'

export default {
   title: 'TODOLIST/EditableSpan',
   component: EditableSpan,
   args: {
      title: 'изменяемый span',
      setNewTitle: action('edit title'),
   },
} as ComponentMeta<typeof EditableSpan>

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>

export const EditableSpanStory = Template.bind({})