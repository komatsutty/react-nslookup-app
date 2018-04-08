module.exports = {
    entry: './src/app.jsx',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    target: 'web',
    devtool: 'inline-soruce-map',
    module: {
        rules: [
            {
                test: /\.js(x?)$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        historyApiFallback: {
            index: 'index.html'
        },
        clientLogLevel: 'info',
        inline: true,
        port: '3000'
    }
}
