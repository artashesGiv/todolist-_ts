import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import AppWithRedux from './AppWithRedux'
import {ReduxStoryProviderDecorator} from './store/ReduxStoryProviderDecorator'

export default {
   title: 'TODOLIST/AppWithRedux',
   component: AppWithRedux,
   decorators: [ReduxStoryProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>

const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux/>

export const AppWithReduxStory = Template.bind({})
AppWithReduxStory.args = {}
