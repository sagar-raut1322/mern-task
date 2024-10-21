// src/components/TransactionTable.js
import React from 'react';

function TransactionTable({ transactions }) {
    console.log('Transactions received:', transactions); // Log transactions for debugging

    // Check if transactions is a valid array
    // if (!Array.isArray(transactions) || transactions.length === 0) {
    //     return <p>No transactions found.</p>;
    // }

    return (
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Sold</th>
                    <th>Date of Sale</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction, index) => (
                    <tr key={index}>
                        <td>
                            <img
                                src={transaction.image || 'https://via.placeholder.com/50'} // Fallback image if missing
                                alt={transaction.title || 'No title'}
                                style={{ width: '50px', height: '50px' }}
                            />
                        </td>
                        <td>{transaction.title || 'N/A'}</td>
                        <td>{transaction.description || 'N/A'}</td>
                        <td>${transaction.price?.toFixed(2) || '0.00'}</td>
                        <td>{transaction.category || 'N/A'}</td>
                        <td>{transaction.sold ? 'Yes' : 'No'}</td>
                        <td>{transaction.dateOfSale ? new Date(transaction.dateOfSale).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TransactionTable;
