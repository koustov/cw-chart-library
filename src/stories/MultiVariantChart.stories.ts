import type { Meta, StoryObj } from '@storybook/react'

import { MultiVariantChartStoryElement } from './MultiVariantChart'
import { IMultiVariantChartProps, MultiVariantChartData, MultiVariantChartProps } from '..'
import { Theme } from '..'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/MultiVariantChart',
  component: MultiVariantChartStoryElement,
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
} satisfies Meta<typeof MultiVariantChartStoryElement>

export default meta
type Story = StoryObj<typeof meta>

const randomNumber = (min: number, max: number): number => {
  return parseInt((Math.random() * (max - min) + min).toFixed())
}

const getData = (variantCount: number): Promise<MultiVariantChartData[]> => {
  return new Promise((resolve) => {
    const data: MultiVariantChartData[] = []
    const date = new Date()
    for (let i = 0; i < variantCount; i++) {
      data.push({
        data: randomNumber(10, 15),
        xaxis: date,
      })
    }
    resolve(data)
  })
}

const BaseStoryProperty: IMultiVariantChartProps = {
  id: 'mv-story',
  height: 800,
  width: window.innerWidth,
  theme: Theme.Dark,
  variantCount: 4,
  charts: [{ label: 'Pack Voltage' }, { label: 'Pack Current' }, { label: 'SOC' }, { label: 'SOH' }],
  ticks: 100,
  interval: 100,
  onTick: getData,
}
const DarkProps = BaseStoryProperty
const LightProps = {
  ...BaseStoryProperty,
  theme: Theme.Light,
}
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Dark: Story = {
  args: MultiVariantChartProps.getInstance(DarkProps),
}

export const Light: Story = {
  args: MultiVariantChartProps.getInstance(LightProps),
}
