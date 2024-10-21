import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

function PieChartComponent({ data }) {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // Ensure data is an array, otherwise use an empty array
    const safeData = Array.isArray(data) ? data : [];

    return (
        <PieChart width={400} height={400}>
            <Pie
                dataKey="count"
                isAnimationActive={false}
                data={safeData}
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
            >
                {safeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    );
}

export default PieChartComponent;
