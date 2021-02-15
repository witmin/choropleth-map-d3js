import {select, geoPath, geoNaturalEarth1, zoom, scaleOrdinal, schemeSpectral} from 'd3';
import {loadAndProcessData} from "./loadAndProcessData";
import {colorLegend} from "./colorLegend";

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

const colorLegendG = svg.append('g')
    .attr('transform', `translate(40, 280)`);

g.append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({type: 'Sphere'}));

svg.call(zoom().on('zoom', (event) => {
    g.attr('transform', event.transform);
}));



const colorScale = scaleOrdinal();
const colorValue = d => d.properties.economy;

loadAndProcessData().then(countries => {
    colorScale
        .domain(countries.features.map(colorValue))
        .domain(colorScale.domain().sort().reverse())
        .range(schemeSpectral[colorScale.domain().length]);

    console.log(countries.features.map(colorValue));

    colorLegendG.call(colorLegend, {
        colorScale,
        spacing: 24,
        textOffset: 20,
        circleRadius: 10,
        backgroundRectWidth: 200
    });

    g.selectAll('path').data(countries.features)
        .enter().append('path')
        .attr('class', 'country')
        .attr('d', pathGenerator)
        .attr('fill', d => colorScale(colorValue(d)))
        .append('title')
        .text(d => d.properties.name + ': ' + colorValue(d));
});