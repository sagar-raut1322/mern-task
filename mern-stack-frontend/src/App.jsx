import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionTable from './components/TransactionTable';
import Statistics from './components/Statistics';
import BarChartComponent from './components/BarChartComponent';
import PieChartComponent from './components/PieChartComponent';
import './App.css';

function App() {
    const [transactions, setTransactions] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [barChartData, setBarChartData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const [month, setMonth] = useState('March');

    useEffect(() => {
        fetchTransactions();
        fetchStatistics();
        fetchBarChartData();    
        fetchPieChartData();
    }, [month]);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('/api/transactions', {
                params: { month }
            });
            console.log('API Response:', response.data); // Log the response for debugging
            setTransactions(Array.isArray(response.data) ? response.data : []); // Ensure it is an array
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setTransactions([]); // Set to an empty array in case of error
        }
    };
    

    const fetchStatistics = async () => {
        const response = await axios.get('/api/statistics', { params: { month } });
        setStatistics(response.data);
    };

    const fetchBarChartData = async () => {
        const response = await axios.get('/api/bar-chart', { params: { month } });
        setBarChartData(response.data);
    };

    const fetchPieChartData = async () => {
        const response = await axios.get('/api/pie-chart', { params: { month } });
        setPieChartData(response.data);
    };

    return (
        <div className="App">
            <h1>Transaction Dashboard</h1>
            <div>
                <label>Select Month: </label>
                <select value={month} onChange={(e) => setMonth(e.target.value)}>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                </select>
            </div>
            <TransactionTable transactions={transactions} />
            <Statistics statistics={statistics} />
            <BarChartComponent data={barChartData} />
            <PieChartComponent data={pieChartData} />
        </div>
    );
}

export default App;
