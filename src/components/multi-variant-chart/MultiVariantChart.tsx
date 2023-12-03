import React, { useEffect } from 'react'
// import './MultiVariantChart.scss'
import * as d3 from 'd3'
import { IMultiVariantChartProps, MultiVariantChartData, MultiVariantChartProps } from './MultiVariantChartProps'
import { uuid4 } from '../../services/uuid'
import { createSvg } from './createSvg'
import { chartUpdate } from './chartUpdate'
import { Theme } from '../../services/theme'
import { createTooltip } from './tooltip'
import { createOverlay } from './createOverlay'

// https://codesandbox.io/s/display-a-vertical-line-and-tooltip-across-all-charts-in-d3js-b2i5e?file=/src/components/Tooltip.js
const MultiVariantChart = (props: IMultiVariantChartProps) => {
  const mv_chart = MultiVariantChartProps.getInstance(props)
  const { id, variantCount, charts, height, width, ticks, onTick, interval, stop, theme } = mv_chart

  useEffect(() => {
    const chartId = id || uuid4()

    const in_height = height
    const in_width = width

    const chartWidth = in_width - 100
    const chartHeight = in_height / 2 - 50

    // time is parameter to track all xAxis movement
    let time = 0
    const num = ticks
    const chartResources: any[] = []

    const latestData: number[][] = Array.from(new Array(variantCount), () => [])
    const data: number[][] = Array.from(new Array(variantCount), () => [])

    const xScales: d3.ScaleTime<number, number, never>[] = []
    const yScales: d3.ScaleLinear<number, number, never>[] = []
    const svgs: any[] = []
    const lines: d3.Line<[number, number]>[] = []
    const areas: any[] = []
    const $data: any[] = []
    const $dataarea: any[] = []
    let stopMoving = false
    const allData: MultiVariantChartData[][] = Array.from(new Array(variantCount), () => [])
    const xAxises: any[] = []
    const yAxises: any[] = []
    for (let i = 0; i < variantCount; i++) {
      xScales.push(
        d3
          .scaleTime()
          .range([0, chartWidth - 100])
          .domain([Date.now(), Date.now() + interval * ticks]),
      )
      // xScales[i].ticks(10);
      yScales.push(d3.scaleLinear().range([chartHeight, 0]))

      const chartData = createSvg(
        d3,
        `${chartId}mvchart`,
        xScales[i],
        yScales[i],
        charts[i].label,
        chartWidth,
        chartHeight,
        i !== variantCount - 1,
      )

      svgs.push(chartData.svg)
      xAxises.push(chartData.xAxis)
      yAxises.push(chartData.yAxis)

      lines.push(
        d3
          .line()
          // eslint-disable-next-line  @typescript-eslint/no-unused-vars
          .x((_d, ind) => xScales[i](ind + time - num))
          // eslint-disable-next-line  @typescript-eslint/no-unused-vars
          .y((_d) => yScales[i](height))
          .curve(d3.curveNatural),
      )
      areas.push(
        d3
          .area()
          // eslint-disable-next-line  @typescript-eslint/no-unused-vars
          .x((_d, ind) => xScales[i](ind + time - num))
          .y0(height)
          // eslint-disable-next-line  @typescript-eslint/no-unused-vars
          .y1((_d) => yScales[i](height)),
      )
      const path = svgs[i]
        .append('path')
        .attr('class', 'line-top data')
        .style('stroke', charts[i].lineColor)
        .style('stroke-width', '2px')
      path.transition().duration(interval).ease(d3.easeLinear)

      const patharea = svgs[i]
        .append('path')
        .attr('class', 'area-top data')
        .attr('fill', `url(#gradient_${i})`)
        .style('stroke-width', '2px')
      patharea.transition().duration(interval).ease(d3.easeLinear)

      // Add Gradient
      svgs[i]
        .append('linearGradient')
        .attr('id', `gradient_${i}`)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', chartHeight)
        .selectAll('stop')
        .data([
          {
            offset: '0%',
            color: charts[i].lineColor,
          },
          {
            offset: '10%',
            color: charts[i].lineColor + '80',
          },
          {
            offset: '20%',
            color: charts[i].lineColor + '40',
          },
          {
            offset: '40%',
            color: charts[i].lineColor + '20',
          },
          {
            offset: '60%',
            color: charts[i].lineColor + '10',
          },
          {
            offset: '80%',
            color: 'transparent',
          },
          {
            offset: '100%',
            color: 'transparent',
          },
        ])
        .enter()
        .append('stop')
        .attr('offset', function (d: any) {
          return d.offset
        })
        .attr('stop-color', function (d: any) {
          return d.color
        })
      createTooltip(d3, svgs[i])

      $data.push(path)
      $dataarea.push(patharea)
    }

    const onMouseEnter = () => {
      stopMoving = true
    }
    const onMouseExit = () => {
      stopMoving = false
    }

    createOverlay(d3, 'chart-overlay', width, height, onMouseEnter, onMouseExit)

    function tick() {
      if (!stop) {
        time++
        onTick().then((res: MultiVariantChartData[]) => {
          const currentData: MultiVariantChartData[] = res

          for (let i = 0; i < variantCount; i++) {
            allData[i].push(res[i])
            data[i][time] = data[i][time - 1] + currentData[i].data
            data[i][time] = Math.max(data[i][time], 0)
            latestData[i].push(currentData[i].data)
          }
          if (time > num) {
            for (let i = 0; i < variantCount; i++) {
              latestData[i].shift()
            }
          }
          update()
        })
      }
    }

    function update() {
      if (!stopMoving) {
        for (let i = 0; i < variantCount; i++) {
          const resource = chartUpdate(
            i,
            d3,
            svgs[i],
            latestData[i],
            time,
            num,
            $data[i],
            $dataarea[i],
            lines[i],
            chartWidth,
            chartHeight,
            charts[i],
            chartResources[i],
            interval,
            i !== variantCount - 1,
            xScales[i],
            yScales[i],
            areas[i],
            xAxises[i],
            yAxises[i],
          )
          if (chartResources.length < 2) {
            chartResources[i] = resource
          }

          if (allData[i].length > num) {
            const xSubset = allData[i].slice(time - num, num)
            const xRange = d3.extent(xSubset, (d) => d.xaxis)

            xScales[i].domain([
              xRange[0] || Date.now(),
              xRange[0] ? xRange[0].getTime() + interval * ticks : Date.now() + interval * ticks,
            ])
            xAxises[i].transition().ease(d3.easeBounce).duration(250).call(d3.axisBottom(xScales[i]))
          }

          // Working
          // xScales[i].domain([time - num, time]);
          const yDomTop = d3.extent(latestData[i])
          if (yDomTop[1]) {
            yScales[i].domain([yDomTop[0], yDomTop[1]])
            yScales[i].ticks(2)
            yAxises[i]
              .transition()
              .style('stroke', '#8993A1')
              .style('width', 1)
              .ease(d3.easeSin)
              .duration(250)
              .call(d3.axisLeft(yScales[i]))
          }

          yAxises[i]
            .call(d3.axisLeft(yScales[i]).tickSizeInner(-chartWidth).tickSizeOuter(0).tickPadding(10))
            .attr('stroke-dasharray', '2 2')
            .attr('class', 'axisY')
          // yScales[i].call($data[i], lines[i].y);
          // const transitionPath = d3.transition().ease(d3.easeSin).duration(1000);
          // svgs[i]
          //   .selectAll("g.yaxis")
          //   .transition(transitionPath)
          //   .duration(1000)
          //   .call(d3.axisLeft(yScales[i]));
          // svgs[i]
          //   .selectAll("g.xaxis")
          //   .transition(transitionPath)
          //   .duration(1000)
          //   .call(d3.axisBottom(xScales[i]));
        }
      }
    }
    setInterval(() => {
      tick()
    }, interval)
  }, [charts, height, id, interval, onTick, stop, ticks, variantCount])

  if (!charts || !variantCount) {
    return <>Loading....</>
  }

  return (
    <div className={`wrapper wrapper--${theme === Theme.Dark ? 'dark' : 'light'}`}>
      <div
        id='chart-overlay'
        style={{
          position: 'absolute',
          height: `${height}px`,
          width: `${width}px`,
        }}
      ></div>
      {Array.from(new Array(variantCount), (_val, index) => index).map((_ch, i) => {
        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontFamily: 'Mona Sans',
                color: '#red',
                height: '20px',
              }}
            >
              {charts[i].label}
            </div>
            <div id={`${id}mvchart`} style={{ height: height }}></div>
          </div>
        )
      })}

      {/* <div>
        <div id={`${id}minimap`}></div>{" "}
      </div> */}
    </div>
  )
}

export default MultiVariantChart
