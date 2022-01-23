import React, {useState, useRef, useEffect} from "react";
import { Project, Symbol, Operator, Pattern, Point } from "../../../../constants/Types";
import * as d3 from 'd3'

import "./PreviewRenderer.css";

type PreviewRendererProps = {
    pattern: Pattern;
    onPreviewClick: (pattern: Pattern) => void 
}

const PreviewRenderer = (props: PreviewRendererProps) => {
    const PREVIEW_WIDTH = 100, PREVIEW_HEIGHT = 100, GRID_SIZE = 10;
    const svg_container = useRef(undefined);

    useEffect(() => {
        d3.select(svg_container.current).select('svg').select('g')
        .selectAll('rect')
        .data(props.pattern.points)
        .join(
            function(enter) {
                return enter
                .append('rect')
                .attr('x', (data_value: Point) => { return data_value.x*PREVIEW_WIDTH/GRID_SIZE})
                .attr('y', (data_value: Point) => data_value.y*PREVIEW_HEIGHT/GRID_SIZE)
                .attr('width', PREVIEW_WIDTH/GRID_SIZE)
                .attr('height', PREVIEW_HEIGHT/GRID_SIZE)
                .attr('fill', (data_value: Point) => {
                    if(data_value.x === props.pattern.start_position[0]
                        && data_value.y === props.pattern.start_position[1])
                        return '#0f0';
                    if(data_value.x === props.pattern.end_position[0]
                        && data_value.y === props.pattern.end_position[1])
                        return '#f00';
                    return '#000'
                });
            },
            function(update) {
                return update
                .attr('x', (data_value: Point) => { return data_value.x*PREVIEW_WIDTH/GRID_SIZE})
                .attr('y', (data_value: Point) => data_value.y*PREVIEW_HEIGHT/GRID_SIZE)
                .attr('width', PREVIEW_WIDTH/GRID_SIZE)
                .attr('height', PREVIEW_HEIGHT/GRID_SIZE)
                .attr('fill', (data_value: Point) => {
                    if(data_value.x === props.pattern.start_position[0]
                        && data_value.y === props.pattern.start_position[1])
                        return '#0f0';
                    if(data_value.x === props.pattern.end_position[0]
                        && data_value.y === props.pattern.end_position[1])
                        return '#f00';
                    return '#000'
                });
            },
            function(exit) {
                return exit.remove();
            }
        );
    });

    return (<div ref = {svg_container} className="preview-svg_container" 
            onClick={(event) => props.onPreviewClick(props.pattern)}>
        <svg width = {`${PREVIEW_WIDTH}px`} height = {`${PREVIEW_HEIGHT}px`}>
            <g>

            </g>
        </svg>
    </div>);
}

export default PreviewRenderer;