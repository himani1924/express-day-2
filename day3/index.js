import express from 'express';
import http from 'http';
const app = express();
import config from './config/index.js';
import api from './api/index.js';
app.use(express.json());
app.use('/api', api);

const server = http.createServer(app);
const port = config.port;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});