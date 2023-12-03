export const createTooltip = (d3: any, svg: any) => {
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

  svg.on('mouseover', () => {
    tooltip_rect.transition().duration(100).style('opacity', 1)
  })
  svg.on('mousemove', (d: any) => {
    tooltip_rect
      .style('left', d3.pointer(d)[0])
      .style('top', d3.pointer(d)[1])
      .style('opacity', 0.9)
      .transition()
      .duration(100)
  })

  svg.on('mouseout', () => {
    tooltip_rect.transition().duration(100).style('opacity', 0)
  })
}
