// /** @format */

// import { Router } from 'express';
// import { serve, setup } from 'swagger-ui-express';
// import swaggerDocument from '../lib/combinedJSON.js';
// import redoc from 'redoc-express';
// console.log(redoc);
// const routerDocs = Router();

// // Uncomment the following block to set up Redoc documentation
// // routerDocs.get(
// //   '/redocs',
// //   (req, res, next) => {
// //     // Middleware to handle errors
// //     res.on('finish', () => {
// //       // Log error if the response status code is not 200
// //       if (res.statusCode !== 200) {
// //         console.error(`Error: ${res.statusCode} - ${req.originalUrl}`);
// //       }
// //     });
// //     next();
// //   },
// //   redoc({
// //     title: '.M.U.F.A.R.', // Title of the documentation
// //     specUrl: 'http://petstore.swagger.io/v2/swagger.json', // Ensure this URL is correct
// //     nonce: '', // Optional nonce for security
// //     redocOptions: {
// //       hideDownloadButton: true, // Hide the download button
// //     },
// //   })
// // );

// // Route for Swagger documentation
// routerDocs.use('/docs', serve, async (req, res, next) => {
  // try {
    // // Fetch the Swagger document
    // const swaggerDoc = await swaggerDocument();
    // // Set up Swagger UI with the fetched document
    // setup(swaggerDoc, {
      // swaggerOptions: {
        // persistAuthorization: true, // Persist authorization information
        // displayRequestDuration: true, // Display request duration
        // requestSnippetsEnabled: true, // Enable request snippets
        // docExpansion: 'none', // Set default expansion for documentation
        // defaultModelsExpandDepth: 5, // Set default models expansion depth
        // operationsSorter: 'method', // Sort operations by method
        // tryItOutEnabled: true, // Enable "Try it out" feature
        // showCommonExtensions: true, // Show common extensions
        // filter: true, // Enable filtering
        // deepLinking: true, // Enable deep linking
        // validateResponses: true, // Validate responses
        // validateModels: true, // Validate models
        // displayOperationId: true, // Display operation ID
        // showExtensions: true, // Show extensions
        // showRequestHeaders: true, // Show request headers
        // showResponseHeaders: true, // Show response headers
        // showFullRequestSchema: true, // Show full request schema
        // showFullResponseSchema: true, // Show full response schema
        // showResponseCodes: true, // Show response codes
        // showExternalDocs: true, // Show external documentation
      // },
      // url: '/docs/', // URL for the documentation
      // customCssUrl: '/assets/css/custom.css', // Custom CSS for styling
      // // customJs: ['/assets/js/custom2.js', '/assets/js/custom.js'], // Uncomment to add custom JavaScript
      // customfavIcon: '/assets/img/favicon.ico', // Custom favicon
      // customSiteTitle: author, // Ensure the author variable is defined elsewhere
      // explorer: false, // Disable the explorer feature
      // deepLinking: true, // Enable deep linking
    // })(req, res, next);
  // } catch (error) {
    // // Log error for debugging if setting up Swagger docs fails
    // console.error('Error setting up Swagger docs:', error);
    // next(error); // Pass the error to the next middleware
  // }
// });

// export default routerDocs;
