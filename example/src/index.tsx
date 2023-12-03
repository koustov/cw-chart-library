import React from 'react'
import ReactDOM from 'react-dom/client'
import { MultiVariantChart } from 'cw-chart-library'
import { Theme } from 'cw-chart-library/dist/esm/services/theme'
// https://betterprogramming.pub/how-to-create-and-publish-react-typescript-npm-package-with-demo-and-automated-build-80c40ec28aca
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <div>
      <h2>Default counter</h2>
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
      />
    </div>
    <hr />
    <div>
      <h2>Counter with predefined value</h2>
    </div>
  </React.StrictMode>,
)
