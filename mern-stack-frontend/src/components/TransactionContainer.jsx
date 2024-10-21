// // src/components/TransactionContainer.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import TransactionTable from './TransactionTable';

// const TransactionContainer = () => {
//     const [transactions, setTransactions] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchTransactions = async () => {
//             try {
//                 setLoading(true);
//                 console.log('Fetching data from API...');
//                 const response = await axios.get('YOUR_API_ENDPOINT_HERE'); // Replace with actual API URL

//                 // Log the entire response for debugging
//                 console.log('API Response:', response);

//                 // Check if the response data is an array
//                 if (Array.isArray(response.data)) {
//                     console.log('Data fetched successfully:', response.data);
//                     setTransactions(response.data);
//                 } else {
//                     console.log('Unexpected data format:', response.data);
//                     setError('Unexpected data format. Expected an array of transactions.');
//                 }
//             } catch (err) {
//                 console.error('Error fetching transactions:', err);
//                 if (err.response) {
//                     console.error('Error response data:', err.response.data);
//                     setError(err.response.data.message || 'Error fetching transactions. Please try again later.');
//                 } else {
//                     setError('Network error. Please check your connection.');
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchTransactions();
//     }, []);

//     if (loading) return <p>Loading transactions...</p>;

//     return (
//         <div>
//             {error && <p className="error-message">{error}</p>}
//             <TransactionTable transactions={transactions} />
//         </div>
//     );
// };

// export default TransactionContainer;
