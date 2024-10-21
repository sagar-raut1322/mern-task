// controllers/transactionController.js
const Transaction = require('../models/Transaction');
const axios = require('axios');

// Initialize the database with data from the third-party API
const initializeDatabase = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        await Transaction.deleteMany(); // Clear existing data
        await Transaction.insertMany(response.data);
        res.status(200).json({ message: 'Database initialized successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error initializing database', error });
    }
};

// Get transactions with search and pagination
const getTransactions = async (req, res) => {
    const { month, search, page = 1, perPage = 10 } = req.query;
    const query = { 
        dateOfSale: { $regex: new RegExp(`-${month}-`, 'i') }
    };

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { price: parseFloat(search) }
        ];
    }

    try {
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(Number(perPage));
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions', error });
    }
};

// Get statistics for the selected month
const getStatistics = async (req, res) => {
    const { month } = req.query;
    const query = { 
        dateOfSale: { $regex: new RegExp(`-${month}-`, 'i') }
    };

    try {
        const totalSaleAmount = await Transaction.aggregate([
            { $match: query },
            { $group: { _id: null, total: { $sum: '$price' } } }
        ]);
        const totalSoldItems = await Transaction.countDocuments({ ...query, sold: true });
        const totalNotSoldItems = await Transaction.countDocuments({ ...query, sold: false });

        res.status(200).json({
            totalSaleAmount: totalSaleAmount[0]?.total || 0,
            totalSoldItems,
            totalNotSoldItems
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching statistics', error });
    }
};

// Get bar chart data
const getBarChartData = async (req, res) => {
    const { month } = req.query;
    const query = { 
        dateOfSale: { $regex: new RegExp(`-${month}-`, 'i') }
    };

    try {
        const ranges = [
            { min: 0, max: 100 },
            { min: 101, max: 200 },
            { min: 201, max: 300 },
            { min: 301, max: 400 },
            { min: 401, max: 500 },
            { min: 501, max: 600 },
            { min: 601, max: 700 },
            { min: 701, max: 800 },
            { min: 801, max: 900 },
            { min: 901, max: Infinity }
        ];

        const data = await Promise.all(ranges.map(async (range) => {
            const count = await Transaction.countDocuments({
                ...query,
                price: { $gte: range.min, $lt: range.max }
            });
            return { priceRange: `${range.min}-${range.max === Infinity ? 'above' : range.max}`, itemCount: count };
        }));

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bar chart data', error });
    }
};

// Get pie chart data
const getPieChartData = async (req, res) => {
    const { month } = req.query;
    const query = { 
        dateOfSale: { $regex: new RegExp(`-${month}-`, 'i') }
    };

    try {
        const data = await Transaction.aggregate([
            { $match: query },
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);
        res.status(200).json(data.map(item => ({ category: item._id, count: item.count })));
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pie chart data', error });
    }
};

// Get combined data from all the APIs
const getCombinedData = async (req, res) => {
    try {
        const [transactions, statistics, barChart, pieChart] = await Promise.all([
            getTransactions(req, res),
            getStatistics(req, res),
            getBarChartData(req, res),
            getPieChartData(req, res)
        ]);
        res.status(200).json({ transactions, statistics, barChart, pieChart });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching combined data', error });
    }
};

module.exports = {
    initializeDatabase,
    getTransactions,
    getStatistics,
    getBarChartData,
    getPieChartData,
    getCombinedData
};
