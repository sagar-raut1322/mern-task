import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function BarChartComponent({ data }) {
    // Ensure data is an array, otherwise use an empty array
    const safeData = Array.isArray(data) ? data : [];

    return (
        <>
            {safeData.length > 0 ? (
                <BarChart width={600} height={300} data={safeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="priceRange" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="itemCount" fill="#8884d8" />
                </BarChart>
            ) : (
                <p>No data available</p> // Optional: display a message if no data
            )}
        </>
    );
}

export default BarChartComponent;
