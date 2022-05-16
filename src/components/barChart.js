/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines-per-function */
import { React, useEffect, useRef } from 'react';
// eslint-disable-next-line id-match
import * as d3 from 'd3';

const barChart = (context) => {
	const { config: { Dimensions: { width, height, margin: { bottom, left },
		xScale: { padding }}}, ref, data } = context;
	const svg = d3.select(ref.current);
	const h = height - bottom;
	const color = d3.scaleOrdinal(d3.schemeCategory10);
	const xScale = d3.scaleBand().range([0, width])
		.padding(padding)
		.domain(data.map((d) => d.name));
	const yScale = d3.scaleLinear().range([h, bottom])
		.domain([0, d3.max(data, (d) => d.total)]);
	const g = svg.append('g');

	g.append('g').attr('transform', `translate(0,${ h })`)
		.call(d3.axisBottom(xScale));

	g.append('g').attr('transform', `translate(${ left }, 0)`)
		.call(d3.axisLeft(yScale));
	g.selectAll('rect').data(data)
		.enter()
		.append('rect')
		.attr('fill', (d) => color(d.name))
		.attr('transform', `translate(${ left }, 0)`)
		.attr('width', xScale.bandwidth())
		.attr('height', (d) => h - yScale(d.total))
		.attr('x', (d) => xScale(d.name))
		.attr('y', (d) => yScale(d.total));
};

const BarChart = (context) => {
	const { config: { Dimensions }} = context;
	const ref = useRef();

	useEffect(() => barChart({ ...context, ref }));

	return (
		<svg ref={ ref }{ ...Dimensions }/>
	);
};

export default BarChart;
