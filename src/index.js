import {select, geoPath, geoNaturalEarth1, zoom} from 'd3';
import {loadAndProcessData} from "./loadAndProcessData";

const width = document.body.clientWidth;
const height = document.body.clientHeight;

const svg = select('svg');

svg
    .attr('width', width)
    .attr('height', height)
    .append('rect');

const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection);

const g = svg.append('g');

g.append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({type: 'Sphere'}));

svg.call(zoom().on('zoom', (event) => {
    g.attr('transform', event.transform);
}));

loadAndProcessData().then(countries => {
    g.selectAll('path').data(countries.features)
        .enter().append('path')
        .attr('class', 'country')
        .attr('d', pathGenerator)
        .attr('fill', '#63d263')
        .append('title')
        .text(d => d.properties.name);
});