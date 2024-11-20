/** @format */

// Importing necessary modules
import express from 'express'; // Express framework for building web applications
import cors from 'cors'; // Middleware for enabling CORS
import { fileURLToPath } from 'url'; // Utility to handle file URLs
import path, { dirname } from 'path'; // Path utilities for file and directory manipulation
import fs from 'fs/promises'; // Promises-based file system module

const __dirname = dirname(fileURLToPath(import.meta.url)); // Get the current directory name
const apiRouter = express.Router(); // Create a new router instance

// Enable CORS globally for all routes
apiRouter.use(cors());
apiRouter.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data
apiRouter.use(express.json()); // Middleware to parse JSON data

// Function to dynamically import route modules
const importRoutes = async routeModule => {
  try {
    console.log(`Mengimpor rute dari ${routeModule}`); // Log the route being imported
    // Import the route handler from the specified module
    const { default: routeHandler } = await import(`./api/${routeModule}`);
    // Check if the imported module is a valid function
    if (typeof routeHandler === 'function') {
      // Use the route handler for the corresponding route
      apiRouter.use(`/${routeModule.replace('.js', '')}`, routeHandler);
      console.log(`Rute ${routeModule} berhasil diimpor`); // Log successful import
    } else {
      console.error(
        `Tidak ditemukan fungsi default yang valid di ${routeModule}` // Log error if no valid function is found
      );
    }
  } catch (error) {
    console.error(`Kesalahan saat mengimpor rute dari ${routeModule}:`, error); // Log import errors
  }
};

// Immediately invoked function to read and import route modules
(async () => {
  try {
    console.log('Membaca direktori modul rute...'); // Log reading directory
    // Read the contents of the 'api' directory
    const routeFiles = await fs.readdir(path.resolve(__dirname, 'api'));
    // Filter for JavaScript files that are not the router itself
    const routeModules = routeFiles.filter(
      file => file.endsWith('.js') && file !== 'router.js'
    );

    console.log(`Ditemukan ${routeModules.length} modul rute untuk diimpor`); // Log number of route modules found

    // Adding error handling for failed imports
    await Promise.all(
      routeModules.map(module =>
        importRoutes(module).catch(
          err => console.error(`Gagal mengimpor ${module}:`, err) // Log errors for each module import
        )
      )
    );
  } catch (error) {
    console.error('Kesalahan saat membaca modul rute:', error); // Log errors while reading route modules
    // Adding a fallback route in case of critical errors
    apiRouter.use('*', (req, res) => {
      res.status(500).json({ message: 'Kesalahan Internal Server' }); // Respond with a 500 error
    });
  }
})();

export default apiRouter; // Export the configured router for use in other parts of the application

// For production, remove this fallback error handling
// and adjust logging mechanisms for large-scale applications
