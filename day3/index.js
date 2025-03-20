import express from 'express';
import http from 'http';
const app = express();
import config from './config/index.js';
import api from './api/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 




app.use('/api', api);

const server = http.createServer(app);
const port = config.port;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});