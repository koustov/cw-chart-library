import * as d3Core from 'd3'
import { ChartProps } from './MultiVariantChartProps'

export const chartUpdate = (
  index: number,
  _d3: any,
  svg: any,
  latestData: number[],
  time: number,
  num: number,
  $data: any,
  $dataarea: any,
  line: d3Core.Line<[number, number]>,
  chartWidth: number,
  chartHeight: number,
  chartOptions: ChartProps,
  chartResources: any,
  interval: number,
  isTop: boolean,
  _xScale: d3.ScaleTime<number, number, never>,
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  yScale: d3.ScaleLinear<number, number, never>,
  area: any,
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  _xaxis: any,
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  _yaxis: any,
) => {
  let lineVertical, circle, textLabel, textValue
  const svgWidth = chartWidth - 100
  if (latestData.length) {
    // xScale.domain([time - num, time]);
    // let yDomTop = d3.extent(latestData);
    // yScale.domain([yDomTop[0] || 10]);
    svg.select(`#gradient_${index}`).attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', chartHeight).selectAll('stop')

    $data.datum(latestData).attr('d', line).transition().duration(interval)
    $dataarea.datum(latestData).attr('d', area).transition().duration(interval)
    const lineLocation = {
      x1: time < num ? time * (svgWidth / num) : num * (svgWidth / num),
      y1: isTop ? 0 : -100,
      x2: time < num ? time * (svgWidth / num) : num * (svgWidth / num),
      y2: isTop ? chartHeight + 200 : chartHeight,
    }

    if (chartResources && chartResources.lineVertical) {
      chartResources.lineVertical
        .transition()
        .duration(interval)
        .attr('x1', lineLocation.x1)
        .attr('y1', lineLocation.y1)
        .attr('x2', lineLocation.x2)
        .attr('y2', lineLocation.y2)
    } else {
      lineVertical = svg
        .append('line')
        .style('stroke', '#aaa')
        .style('stroke-width', 2)
        .attr('id', 'vline')
        .attr('stroke-dasharray', '1 2')
        .attr('x1', lineLocation.x1)
        .attr('y1', lineLocation.y1)
        .attr('x2', lineLocation.x2)
        .attr('y2', lineLocation.y2)
        .attr('position', 'relative')
    }

    const circleLocation = {
      x: time < num ? time * (svgWidth / num) : num * (svgWidth / num),
      y: yScale(latestData[latestData.length - 1]),
    }
    if (chartResources && chartResources.circle) {
      chartResources.circle.transition().duration(interval).attr('cx', circleLocation.x).attr('cy', circleLocation.y)
    } else {
      circle = svg
        .append('circle')
        .attr('cx', circleLocation.x)
        .attr('cy', circleLocation.y)
        .attr('r', 6)
        .attr('stroke', chartOptions.lineColor)
        .attr('stroke-width', '3px')
        .attr('fill', '#555')
    }

    const labelLocation = {
      x: time < num ? time * (svgWidth / num) + 20 : num * (svgWidth / num) + 20,
      y: yScale(latestData[latestData.length - 1]),
    }
    if (chartResources && chartResources.textLabel && chartResources.textValue) {
      chartResources.textLabel.transition().duration(interval).attr('x', labelLocation.x).attr('y', labelLocation.y)
      chartResources.textValue
        .transition()
        .duration(interval)
        .attr('x', labelLocation.x)
        .attr('y', labelLocation.y + 20)
        .text(latestData[latestData.length - 1])
    } else {
      textLabel = svg
        .append('text')
        .attr('id', 'labeltext')
        .attr('x', labelLocation.x)
        .attr('y', labelLocation.y)
        .attr('text-anchor', 'left')
        .attr('class', 'label-top')
        .style('font-size', '14px')
        .style('z-index', '999')

        .style('fill', chartOptions.lineColor)
        .text(chartOptions.label)

      textValue = svg
        .append('text')
        .attr('id', 'labelvalue')
        .attr('x', labelLocation.x)
        .attr('y', labelLocation.y + 20)
        .attr('text-anchor', 'left')
        .attr('class', 'label-top')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .style('z-index', '999')
        .text(latestData[latestData.length - 1])
    }
  }

  if (lineVertical) {
    return {
      lineVertical,
      circle,
      textLabel,
      textValue,
    }
  } else {
    return undefined
  }
}
