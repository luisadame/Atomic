const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = (env, options) => {
	const isDevMode = options.mode !== 'production';
	return {
		mode: 'development',
		entry: __dirname + '/src/index.js',
		plugins: [
			new MiniCssExtractPlugin({
				filename: isDevMode ? '[name].css' : '[name].[hash].css',
				chunkFilename: isDevMode ? '[id].css' : '[id].[hash].css'
			}),
			new HtmlWebpackPlugin({
				template: './src/index.html',
				filename: './index.html'
			})
		],
		output: {
			path: path.resolve(__dirname, 'docs'),
			publicPath: isDevMode ? '/docs/' : '/',
			filename: 'app.js'
		},
		module: {
			rules: [
				{
					enforce: 'pre',
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'eslint-loader'
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: 'babel-loader'
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
				},
				{
					test: /\.(png|jpg|gif|woff(2)?)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[path][name].[ext]'
							}
						}
					]
				},
				{
					test: /\.svg$/,
					use: 'svg-inline-loader'
				}
			]
		},
		devServer: {
			contentBase: path.join(__dirname, 'docs'),
			publicPath: '/docs/',
			watchContentBase: true,
			compress: true,
			port: 9000,
			disableHostCheck: true
		}
	};
};
