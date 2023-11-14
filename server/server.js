const express = require('express');
const componentRoutes = require('./routes/components.route');

const app = express();

app.use('/api', componentRoutes);

app.listen(5000);
