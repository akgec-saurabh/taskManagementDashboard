import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const data = [
  { name: "<5", value: 19912018 },
  { name: "5-9", value: 20501982 },
  { name: "10-14", value: 20679786 },
  { name: "15-19", value: 21354481 },
  { name: "20-24", value: 22604232 },
  { name: "25-29", value: 21698010 },
  { name: "30-34", value: 21183639 },
  { name: "35-39", value: 19855782 },
  { name: "40-44", value: 20796128 },
  { name: "45-49", value: 21370368 },
  { name: "50-54", value: 22525490 },
  { name: "55-59", value: 21001947 },
  { name: "60-64", value: 18415681 },
  { name: "65-69", value: 14547446 },
  { name: "70-74", value: 10587721 },
  { name: "75-79", value: 7730129 },
  { name: "80-84", value: 5811429 },
  { name: "≥85", value: 5938752 },
];
const Pie = ({ height, width, flag }) => {
  const pieChart = useRef();
  const value = flag ? "count" : "value";

  useEffect(() => {
    // Get positions for each data object
    const piedata = d3.pie().value((d) => d[value])(data);
    // Define arcs for graphing
    const arc = d3
      .arc()
      .innerRadius(width / 3)
      .outerRadius(width / 2);

    const colors = d3.scaleOrdinal([
      "#ffa822",
      "#134e6f",
      "#ff6150",
      "#1ac0c6",
      "#dee0e6",
    ]);

    // Define the size and position of svg
    const svg = d3
      .select(pieChart.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      // .style('background-color','yellow')
      .append("g");

    svg
      .append("g")
      .selectAll("path")
      .data(piedata)
      .join("path")
      .attr("fill", (d, i) => colors(i))
      .attr("stroke", "white")
      // .attr("fill-opacity", 0)
      .attr("d", arc);
  });

  return (
    <div id="chartArea">
      <svg ref={pieChart}></svg>
    </div>
  );
};

export default Pie;
