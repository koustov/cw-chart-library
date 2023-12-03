import React from 'react'
import ReactDOM from 'react-dom/client'
import { MultiVariantChart as MVCFromPackage } from 'cw-chart-library'
import { Theme } from 'cw-chart-library/dist/esm/services/theme'
import { MultiVariantChart, MultiVariantChartData } from '../..'
// https://betterprogramming.pub/how-to-create-and-publish-react-typescript-npm-package-with-demo-and-automated-build-80c40ec28aca
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const randomNumber = (min: number, max: number): number => {
  return parseInt((Math.random() * (max - min) + min).toFixed())
}

const getData = (variantCount): Promise<MultiVariantChartData[]> => {
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
root.render(
  <React.StrictMode>
    <div>
      <h2>From Package</h2>
      <MVCFromPackage
        id='mv_test_package'
        onTick={() => undefined}
        variantCount={2}
        charts={[{ label: 'Pack Voltage' }, { label: 'Pack Current' }]}
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
      <h2>From Local</h2>
      <MVCFromPackage
        id='mv_test_code'
        onTick={() => getData(2)}
        variantCount={2}
        charts={[{ label: 'Pack Voltage' }, { label: 'Pack Current' }]}
        height={300}
        width={window.innerWidth}
        backgroundColor={'red'}
        xAxisPointLimit={100}
        theme={Theme.Light}
        margin={{}}
        interval={100}
        headsup={3}
        stop={false}
        ticks={100}
      />
    </div>
  </React.StrictMode>,
)
