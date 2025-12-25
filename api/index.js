// Vercel serverless entry: route all requests to Express app
const app = require('../server');

module.exports = (req, res) => app(req, res);
