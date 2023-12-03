export const createSvg = (
  d3: any,
  id: string,
  x: d3.ScaleLinear<number, number, never>,
  y: d3.ScaleLinear<number, number, never>,
  title: string,
  chartWidth: number,
  chartHeight: number,
  isTop = false,
) => {
  const svg = d3
    .select(`#${id}`)
    .append('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight)
    .append('g')
    .attr('transform', 'translate(30, 20)')

  // const defs = svg.append("defs");

  const yAxis = svg
    .append('g')
    .call(d3.axisLeft(y).tickSizeInner(-chartWidth).tickSizeOuter(0).tickPadding(10))
    .attr('stroke-dasharray', '2 2')
    .attr('class', 'axisY')

  const xAxis = svg
    .append('g')
    .attr('transform', `translate(0,${chartHeight - 40})`)
    .call(
      d3
        .axisBottom(x)
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .tickSize(1)
        .tickFormat(isTop ? '' : d3.timeFormat('%m:%S'))
        .tickPadding(10),
    )

    .selectAll('text')
    .attr('transform', 'translate(-10,0)')

    .style('text-anchor', 'end')

  svg
    .append('text')
    .attr('x', -30)
    .attr('y', -5)
    .attr('text-anchor', 'left')
    .attr('stroke', '#616D7Cs')
    .style('font-size', '16px')
    .style('z-index', 999)
    .text(title)
  return { svg, xAxis, yAxis }
}
