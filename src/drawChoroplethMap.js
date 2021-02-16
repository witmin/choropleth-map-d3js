import {geoPath, geoNaturalEarth1, zoom} from 'd3';

const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection);

export const choroplethMap = (selection, props) => {
    const {
        features,
        colorScale,
        colorValue
    } = props;

    console.log(features);

    const gUpdate = selection.selectAll('g').data([null]);
    const gEnter = gUpdate.enter().append('g');
    const g = gUpdate.merge(gEnter);

    gEnter.append('path')
        .attr('class', 'sphere')
        .attr('d', pathGenerator({type: 'Sphere'}));

    selection.call(zoom().on('zoom', (event) => {
        g.attr('transform', event.transform);
    }));

    const countryPaths = g.selectAll('.country').data(features);
    const countryPathsEnter = countryPaths
        .enter().append('path')
        .attr('class', 'country')
        .attr('d', pathGenerator)
        .attr('fill', d => colorScale(colorValue(d)));

    countryPaths
        .merge(countryPathsEnter);

    countryPathsEnter
        .append('title')
        .text(d => d.properties.name + ': ' + colorValue(d));
}