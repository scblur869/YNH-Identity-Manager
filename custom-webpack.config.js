const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $ENV: {
        ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT),
        AUTH_SVC: JSON.stringify(process.env.AUTH_SVC)
      }
    })
  ]
};
