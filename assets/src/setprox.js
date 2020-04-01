import proxy from 'http-proxy-middleware';

module.exports = app => {
  app.use(proxy('/api', { target: 'http://localhost:1339/' }));
};
