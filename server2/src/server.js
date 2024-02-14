require('dotenv').config();

const express = require('express');
const cors = require('cors');

const PORT = process.env.API_PORT;

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./api/routes/user');
app.use('/api', userRoutes);

const componentRoutes = require('./api/routes/component');
app.use('/api', componentRoutes);


app.listen(PORT, () => {
    console.log(`API is listening on port (${PORT})...`);
});
