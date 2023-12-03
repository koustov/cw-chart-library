import React from 'react'
import ReactDOM from 'react-dom/client'
import { MultiVariantChart } from 'cw-chart-library'
import { Theme } from 'cw-chart-library/dist/esm/services/theme'
var root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(
      'div',
      null,
      React.createElement('h2', null, 'Default counter'),
      React.createElement(MultiVariantChart, {
        id: 'mv_test',
        onTick: function () {
          return undefined
        },
        variantCount: 1,
        charts: [],
        height: 100,
        width: 100,
        backgroundColor: 'red',
        xAxisPointLimit: 100,
        theme: Theme.Dark,
        margin: {},
        interval: 100,
        headsup: 3,
        stop: false,
        ticks: 100,
      }),
    ),
    React.createElement('hr', null),
    React.createElement('div', null, React.createElement('h2', null, 'Counter with predefined value')),
  ),
)
//# sourceMappingURL=index.js.map
