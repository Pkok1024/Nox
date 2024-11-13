import express from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
const currentDirectory = dirname(new URL(import.meta.url).pathname)

const app = express();
app.set('view engine', 'ejs');
app.set('views', join(currentDirectory, '/pages'));
app.use(express.static(join(currentDirectory, '/pages')));
app.use(cors());
app.get('/', (req, res) => res.render('home'));
app.get('/document', (req, res) => res.render('projects'));

export default app;