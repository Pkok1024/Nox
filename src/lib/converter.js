/** @format */

import fs from 'fs/promises';
import path from 'path';

/**
 * Function to convert Swagger JSON paths to JSDoc @swagger annotations
 * @param {string} inputFile - Path to the Swagger JSON file
 * @param {string} outputFile - Path to the output JS file
 */
export default async function convertSwaggerPathsToJsDoc(inputFile) {
  try {
    // Read the Swagger JSON file asynchronously
    // const data = await fs.readFile(inputFile, 'utf8')
    const swaggerJson = JSON.parse(inputFile);

    // Initialize an empty array to hold JSDoc lines
    let jsDocLines = [];

    // Process each path in the Swagger JSON
    for (let route in swaggerJson.paths) {
      for (let method in swaggerJson.paths[route]) {
        const endpoint = swaggerJson.paths[route][method];

        jsDocLines.push(`\n/**`);
        jsDocLines.push(` * @swagger`);
        jsDocLines.push(` * ${route}:`);
        jsDocLines.push(` *   ${method}:`);

        if (endpoint.tags) {
          jsDocLines.push(` *     tags:`);
          endpoint.tags.forEach(tag => {
            jsDocLines.push(` *       - ${tag}`);
          });
        }

        if (endpoint.summary)
          jsDocLines.push(` *     summary: ${endpoint.summary}`);
        if (endpoint.description)
          jsDocLines.push(` *     description: ${endpoint.description}`);

        if (endpoint.parameters) {
          jsDocLines.push(` *     parameters:`);
          endpoint.parameters.forEach(param => {
            jsDocLines.push(` *       - in: ${param.in}`);
            jsDocLines.push(` *         name: ${param.name}`);
            jsDocLines.push(` *         required: ${param.required}`);
            jsDocLines.push(` *         description: ${param.description}`);
            if (param.schema) {
              jsDocLines.push(` *         schema:`);
              jsDocLines.push(` *           type: ${param.schema.type}`);
            }
          });
        }

        if (endpoint.responses) {
          jsDocLines.push(` *     responses:`);
          for (let response in endpoint.responses) {
            const responseDetail = endpoint.responses[response];
            jsDocLines.push(` *       ${response}:`);
            if (responseDetail.description)
              jsDocLines.push(
                ` *         description: ${responseDetail.description}`
              );
            if (responseDetail.content) {
              jsDocLines.push(` *         content:`);
              for (let contentType in responseDetail.content) {
                const contentDetail = responseDetail.content[contentType];
                jsDocLines.push(` *           ${contentType}:`);
                if (contentDetail.schema) {
                  jsDocLines.push(` *             schema:`);
                  if (contentDetail.schema.$ref) {
                    jsDocLines.push(
                      ` *               $ref: ${contentDetail.schema.$ref}`
                    );
                  } else {
                    jsDocLines.push(
                      ` *               type: ${contentDetail.schema.type}`
                    );
                    if (contentDetail.schema.items) {
                      jsDocLines.push(` *               items:`);
                      jsDocLines.push(
                        ` *                 type: ${contentDetail.schema.items.type}`
                      );
                      if (contentDetail.schema.items.properties) {
                        jsDocLines.push(` *                 properties:`);
                        for (let property in contentDetail.schema.items
                          .properties) {
                          jsDocLines.push(` *                   ${property}:`);
                          jsDocLines.push(
                            ` *                     type: ${contentDetail.schema.items.properties[property].type}`
                          );
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        jsDocLines.push(` */\n`);
      }
    }

    return jsDocLines.join('\n');
  } catch (error) {
    console.error(`Error processing Swagger JSON: ${error.message}`);
  }
}
