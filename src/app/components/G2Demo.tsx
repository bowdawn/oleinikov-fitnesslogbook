import React, { useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';

interface LineGraphProps {
  data?: { index: number; weight: number }[]; // Optional data prop
}

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the chart container

  // Function to generate random data if no data is provided
  const generateRandomData = () => {
    return Array.from({ length: 10 }, (_, index) => ({
      index: index + 1,
      weight: Math.floor(Math.random() * 100) + 50, // Random weight between 50 and 150
    }));
  };

  useEffect(() => {
    if (containerRef.current) {
      // Use provided data or generate random data
      const chartData = data || generateRandomData();

      // Instantiate a new chart
      const chart = new Chart({
        container: containerRef.current,
        autoFit: true, // Makes the chart responsive to the container size
        height: 400,
      });

      // Specify visualization
      chart
        .area() // Create a line mark and add it to the chart
        .data(chartData) // Bind data to the chart
        .encode('x', 'index') // Assign 'index' column to x position channel
        .encode('y', 'weight') // Assign 'weight' column to y position channel
        .style('fill', 'l(90) 0:#1677ff 0.2:#4096ff 0.4:#69b1ff 0.6:#91caff 0.7:#bae0ff 0.8:#e6f4ff 1:#ffffff') // Reversed gradient fill
        .animate({ enter: { type: 'growInX', duration: 3000 } }); // Add 3-second grow-in animation

      // Render visualization
      chart.render();

      // Clean up chart instance on unmount
      return () => {
        chart.destroy();
      };
    }
  }, [data]); // Re-render the chart if data changes

  return <div ref={containerRef} style={{ width: '100%', height: '400px' }}></div>;
};

export default LineGraph;
