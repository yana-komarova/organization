const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const server = new WebpackDevServer(webpack(config), {
    contentBase: './dist',
    hot: true,
    open: true,
});

server.listen(9000, 'localhost', () => {
    console.log('Starting server on http://localhost:9000');
    process.send('ok');
});