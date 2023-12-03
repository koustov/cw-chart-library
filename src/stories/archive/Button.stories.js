import { Button } from './Button'
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
var meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}
export default meta
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export var Primary = {
  args: {
    primary: true,
    label: 'Button',
  },
}
export var Secondary = {
  args: {
    label: 'Button',
  },
}
export var Large = {
  args: {
    size: 'large',
    label: 'Button',
  },
}
export var Small = {
  args: {
    size: 'small',
    label: 'Button',
  },
}
//# sourceMappingURL=Button.stories.js.map
