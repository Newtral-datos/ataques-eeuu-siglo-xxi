<script lang="ts">
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import * as topojson from 'topojson-client';
  import type { Topology, GeometryCollection } from 'topojson-specification';
  import { countryNameMapping } from '$lib/data/presidents';

  export let highlightedCountries: string[] = [];
  export let presidentName: string = '';

  let svgElement: SVGSVGElement;
  let worldData: Topology | null = null;
  let tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;

  const width = 960;
  const height = 500;
  const mapColor = { fill: '#01f3b3', hover: '#00d9a0' };

  // Get English country names for highlighting
  $: highlightedEnglish = highlightedCountries.map(c => countryNameMapping[c] || c);

  onMount(async () => {
    const response = await fetch('/world.json');
    worldData = await response.json();

    tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background', 'rgba(0,0,0,0.8)')
      .style('color', 'white')
      .style('padding', '8px 12px')
      .style('border-radius', '4px')
      .style('font-size', '14px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('z-index', '1000');

    drawMap(highlightedEnglish);

    return () => {
      tooltip.remove();
    };
  });

  $: if (worldData && svgElement && highlightedEnglish !== undefined) {
    drawMap(highlightedEnglish);
  }

  function drawMap(highlighted: string[]) {
    if (!worldData || !svgElement) return;

    const svg = d3.select(svgElement);
    svg.selectAll('*').remove();

    const projection = d3.geoNaturalEarth1()
      .scale(170)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    const countries = topojson.feature(
      worldData,
      worldData.objects.countries as GeometryCollection
    );

    // Draw countries
    svg.append('g')
      .selectAll('path')
      .data((countries as any).features)
      .enter()
      .append('path')
      .attr('d', path as any)
      .attr('fill', (d: any) => {
        const countryName = d.properties.name;
        return highlighted.includes(countryName) ? mapColor.fill : '#e5e7eb';
      })
      .attr('stroke', '#9ca3af')
      .attr('stroke-width', 0.5)
      .style('cursor', (d: any) => {
        const countryName = d.properties.name;
        return highlighted.includes(countryName) ? 'pointer' : 'default';
      })
      .on('mouseover', function(event: MouseEvent, d: any) {
        const countryName = d.properties.name;
        if (highlighted.includes(countryName)) {
          d3.select(this).attr('fill', mapColor.hover);

          // Find Spanish name
          const spanishName = Object.entries(countryNameMapping)
            .find(([_, eng]) => eng === countryName)?.[0] || countryName;

          tooltip
            .style('opacity', 1)
            .html(spanishName)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px');
        }
      })
      .on('mousemove', function(event: MouseEvent) {
        tooltip
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseout', function(event: MouseEvent, d: any) {
        const countryName = d.properties.name;
        if (highlighted.includes(countryName)) {
          d3.select(this).attr('fill', mapColor.fill);
        }
        tooltip.style('opacity', 0);
      });

    // Draw borders
    svg.append('path')
      .datum(topojson.mesh(worldData, worldData.objects.countries as GeometryCollection, (a, b) => a !== b))
      .attr('fill', 'none')
      .attr('stroke', '#9ca3af')
      .attr('stroke-width', 0.5)
      .attr('d', path);
  }
</script>

<div class="map-container">
  <svg bind:this={svgElement} viewBox="0 0 {width} {height}" preserveAspectRatio="xMidYMid meet">
  </svg>
</div>

<style>
  .map-container {
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    position: relative;
  }

  svg {
    width: 100%;
    height: auto;
    background: #f8fafc;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
</style>
