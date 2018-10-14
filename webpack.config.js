module.exports = {
    mode: 'development',
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/docs',
        publicPath: '/docs/',
        filename: 'app.js'
    },
    module: {
        rules: [{
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
};
