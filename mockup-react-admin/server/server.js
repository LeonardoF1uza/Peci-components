const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const componentRoutes = require('./routes/components.route');
const familyRoutes = require('./routes/families.route');
const userRoutes = require('./routes/users.route');
const requisitionRoutes = require('./routes/requisitions.route');

const PORT = process.env.API_PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', componentRoutes);
app.use('/api', familyRoutes);
app.use('/api', userRoutes);
app.use('/api', requisitionRoutes);


app.listen(PORT, () => {
    console.log(`Server is listening on port (${PORT})...`);
});
