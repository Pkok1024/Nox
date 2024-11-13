/** @format */

import express from 'express';

const apiR = express.Router();
const errorResponse = (res, code, message) => {
  res.status(code).json({
    error: message,
  });
};

apiR.get('/:endpoint', (req, res) => {
  switch (req.params.endpoint) {
    case 'runtime':
      return res.json({
        uptime: process.uptime(),
      });

    case 'ip':
      return res.send({
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      });

    case 'clock':
      const now = Date.now();

      const timeWIB = new Date(now + 7 * 60 * 60 * 1000)
        .toISOString()
        .slice(11, 19);
      const timeWITA = new Date(now + 8 * 60 * 60 * 1000)
        .toISOString()
        .slice(11, 19);
      const timeWIT = new Date(now + 9 * 60 * 60 * 1000)
        .toISOString()
        .slice(11, 19);

      return res.json({
        wib: timeWIB,
        wita: timeWITA,
        wit: timeWIT,
      });

    default:
      errorResponse(res, 400, 'Features not found');
  }
});

export default apiR;
