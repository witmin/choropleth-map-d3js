export const colorLegend = (selection, props) => {
    const {colorScale, spacing, textOffset, circleRadius, backgroundRectWidth} = props;

    const backgroundRect = selection.selectAll('rect')
        .data([null]);

    backgroundRect.enter().append('rect')
        .merge(backgroundRect)
        .attr('x', -circleRadius * 2)
        .attr('y', -circleRadius * 2)
        .attr('rx', circleRadius * 2)
        .attr('width', backgroundRectWidth + circleRadius)
        .attr('height', spacing * colorScale.domain().length + circleRadius * 2)
        .attr('fill', 'white')
        .attr('opacity', 0.8);

    const groups = selection.selectAll('.tick')
        .data(colorScale.domain());
    const groupEnter = groups.enter().append('g');
    groupEnter.merge(groups)
        .attr('transform', (d, i) => `translate(0, ${i * spacing})`);

    groups.exit().remove();

    // Enter & Update
    groupEnter.append('circle')
        .merge(groups.select('circle'))
        .attr('r', circleRadius)
        .attr('fill', colorScale);

    groupEnter.append('text')
        .attr('x', textOffset)
        .attr('dy', '0.32em')
        .merge(groups.select('text'))
        .text(d => d);

}