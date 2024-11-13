/** @format */

import fs from 'fs/promises'; // Menggunakan versi async dari fs
import ora from 'ora';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import converter from './converter.js';

/**
 * Get all files with a specific extension from a directory
 * @param {string} directory - The directory path
 * @param {string} extension - The file extension
 * @returns {Promise<string[]>} - Array of file names
 */
const getFilesByExtension = async (directory, extension) => {
  try {
    const files = await fs.readdir(directory);
    return files.filter(file => file.endsWith(extension));
  } catch (error) {
    throw new Error(`Error reading directory: ${error.message}`);
  }
};

/**
 * Dynamically import a module and return its default export
 * @param {string} modulePath - The path to the module
 * @returns {Promise<any>} - The default export of the module
 */
const importModule = async modulePath => {
  try {
    const { default: module } = await import(modulePath);
    return module;
  } catch (error) {
    throw new Error(`Error importing module: ${error.message}`);
  }
};

/**
 * Generate a combined JSON object from multiple endpoint definitions
 * @returns {Promise<Object>} - The combined JSON object
 */
export default async function CombinedJSON() {
  try {
    const interfacePath = path.join(process.cwd(), './src/routes/interface');
    const endpointFiles = await getFilesByExtension(interfacePath, '.js');
    const endpointModules = await Promise.all(
      endpointFiles.map(file => importModule(path.join(interfacePath, file)))
    );

    return {
      openapi: '3.1.0',
      info: {
        title: '.M.U.F.A.R. APIs',
        version: '1.3.8',
        'x-logo': {
          url: '/assets/img/logo.png',
          backgroundColor: '#000',
          altText: 'Example logo',
        },
      },
      security: [
        {
          apiKey: [],
        },
      ],
      components: {
        securitySchemes: {
          apiKey: {
            type: 'apiKey',
            in: 'query',
            name: 'apikey',
          },
        },
        schemas: {
          SuccessResponse: {
            description: 'Success',
          },
        },
      },
      paths: endpointModules.reduce(
        (paths, module) => ({ ...paths, ...module }),
        {}
      ),
    };
  } catch (error) {
    throw new Error(`Error generating combined JSON: ${error.message}`);
  }
}

const writeFileWithSpinner = async (filePath, data) => {
  const spinner = ora(`Writing to ${filePath}`).start();
  try {
    await fs.access(filePath, fs.constants.F_OK);
    await fs.unlink(filePath);
  } catch (error) {
    // File does not exist, continue with writing
  }
  try {
    await fs.writeFile(filePath, data);
    spinner.succeed(`${filePath}`);
  } catch (error) {
    spinner.fail(`Failed to write to ${filePath}: ${error.message}`);
    console.error('Error details:', error);
  }
};
(async () => {
  try {
    const dir = dirname(fileURLToPath(import.meta.url));
    const json = JSON.stringify(await CombinedJSON(), null, 2);

    await writeFileWithSpinner(join(dir, '../views/pages/swagger.json'), json);
    await writeFileWithSpinner(
      join(dir, '../views/pages/swagger.js'),
      await converter(json)
    );
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
