import {json, tsv} from "d3";
import {feature} from "topojson";

export const loadAndProcessData = () =>
    Promise.all([
        tsv('./50m.tsv'),
        json('./countries-50m.json')
    ])
        .then(([tsvData, topoJSONdata]) => {
            const rowById = tsvData.reduce((accumulator, d) => {
                accumulator[d.iso_n3] = d;
                return accumulator;
            }, {});

            const countries = feature(topoJSONdata, topoJSONdata.objects.countries);
            countries.features.forEach(d => {
                Object.assign(d.properties, rowById[d.id]);
            });

            return countries;
        });
