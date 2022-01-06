
module.exports = {
  compress: false,
  proxy: {
    '/api': {
      target: 'http://localhost:8090',
      pathRewrite: { '^/api': '' },
    },
  },
};
