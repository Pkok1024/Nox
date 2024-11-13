/** @format */

// server.js
import app from './app.js';
import chalk from 'chalk';
import('./lib/message.js');
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    chalk.green('✅') + chalk.cyan(` Server is running on port ${port}`)
  );
});

export default app;
