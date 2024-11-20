import express from 'express';
import {dirname,  join} from 'path';
const app = express();
const currentDirectory = dirname(new URL(import.meta.url).pathname)
app.set('view engine', 'ejs');
app.set('views', join(currentDirectory, '/pages'));
app.use(express.static(join(currentDirectory, '/pages')));


app.use((req, res, next) => {
  res.status(404).json({ error: '404 Not Found' });
});

export default app;