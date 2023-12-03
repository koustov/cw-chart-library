import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { MultiVariantChart } from '..'
import { Theme } from '../services/theme'

describe('Common render', () => {
  it('renders without crashing', () => {
    render(
      <MultiVariantChart
        id='mv_test'
        onTick={() => undefined}
        variantCount={1}
        charts={[]}
        height={100}
        width={100}
        backgroundColor={'red'}
        xAxisPointLimit={100}
        theme={Theme.Dark}
        margin={{}}
        interval={100}
        headsup={3}
        stop={false}
        ticks={100}
      />,
    )
  })
})
