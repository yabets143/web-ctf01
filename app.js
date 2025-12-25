// Local runner: start Express server
const app = require('./server');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CTF app running on http://localhost:${PORT}`);
});
