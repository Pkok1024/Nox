/** @format */

import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
import swaggerDocument from '../lib/combinedJSON.js';
import redoc from 'redoc-express';
console.log(redoc)
const routerDocs = Router();

// routerDocs.get(
  // '/redocs',
  // (req, res, next) => {
    // // Middleware untuk menangani error
    // res.on('finish', () => {
      // if (res.statusCode !== 200) {
        // console.error(`Error: ${res.statusCode} - ${req.originalUrl}`);
      // }
    // });
    // next();
  // },
  // redoc({
    // title: '.M.U.F.A.R.',
    // specUrl: 'http://petstore.swagger.io/v2/swagger.json', // Pastikan URL ini benar
    // nonce: '', // Jika perlu untuk keamanan
    // redocOptions: {
      // hideDownloadButton: true, // Menyembunyikan tombol unduh
    // },
  // })
// );


// Route for Swagger documentation
routerDocs.use('/docs', serve, async (req, res, next) => {
  try {
    const swaggerDoc = await swaggerDocument();
    setup(swaggerDoc, {
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        requestSnippetsEnabled: true,
        docExpansion: 'none',
        defaultModelsExpandDepth: 5,
        operationsSorter: 'method',
        tryItOutEnabled: true,
        showCommonExtensions: true,
        filter: true,
        deepLinking: true,
        validateResponses: true,
        validateModels: true,
        displayOperationId: true,
        showExtensions: true,
        showRequestHeaders: true,
        showResponseHeaders: true,
        showFullRequestSchema: true,
        showFullResponseSchema: true,
        showResponseCodes: true,
        showExternalDocs: true,
      },
      url: '/docs/',
      customCssUrl: '/assets/css/custom.css',
      // customJs: ['/assets/js/custom2.js', '/assets/js/custom.js'],
      customfavIcon: '/assets/img/favicon.ico',
      customSiteTitle: author, // Pastikan variabel author didefinisikan di tempat lain
      explorer: false,
      deepLinking: true,
    })(req, res, next);
  } catch (error) {
    console.error('Error setting up Swagger docs:', error); // Log error untuk debugging
    next(error);
  }
});

export default routerDocs;
