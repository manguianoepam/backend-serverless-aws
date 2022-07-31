const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
module.exports = {
    context: __dirname,
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    entry: slsw.lib.entries,
    target: 'node',
    /*target: 'node',
    mode: 'none',*/
    externals: [nodeExternals(), 'pg-native'],
};

