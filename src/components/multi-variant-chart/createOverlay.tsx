export const createOverlay = (
  d3: any,
  id: string,
  chartWidth: number,
  chartHeight: number,
  onMouseEnter: any,
  onMouseExit: any,
) => {
  const svg = d3.select(`#${id}`).append('svg').attr('width', '100%').attr('height', '100%')

  svg
    .append('g')
    .attr('width', chartWidth)
    .attr('height', chartHeight * 2 + 40)
    .style('background-color', 'transparent')

  const tooltip_rect = svg
    .append('rect')
    .attr('x', 10)
    .attr('y', 60)
    .attr('width', 200)
    .attr('height', 100)
    .attr('stroke', 'black')
    .attr('fill', 'white')
    .attr('z-index', 9999)
    .style('opacity', 0)

  const line = svg
    .append('line')
    .style('stroke', '#000')
    .style('stroke-width', 0.5)
    .attr('id', 'vline')
    .attr('stroke-dasharray', '2 2')
    .attr('position', 'relative')

  svg.on('mouseover', () => {
    tooltip_rect.transition().duration(100).style('opacity', 1)
    line.transition().duration(100).style('opacity', 1)
    onMouseEnter()
  })
  svg.on('mousemove', (d: any) => {
    tooltip_rect
      .attr('x', d3.pointer(d)[0])
      .attr('y', d3.pointer(d)[1])
      .style('opacity', 0.9)
      .transition()
      .duration(100)
    line
      .attr('x1', d3.pointer(d)[0])
      .attr('y1', 0)
      .attr('x2', d3.pointer(d)[0])
      .attr('y2', 500)
      .transition()
      .duration(100)
  })

  svg.on('mouseout', () => {
    tooltip_rect.transition().duration(100).style('opacity', 0)
    line.transition().duration(100).style('opacity', 0)
    onMouseExit()
  })

  return svg
}
