const path    = require('path')
const webpack = require('webpack')

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

const HtmlWebpackPlugin = require('html-webpack-plugin')

/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */

module.exports = {
	mode : 'development',
	entry: './src/js/index.js',

	output: {
		filename: '[name].[chunkhash].js',
		path    : path.resolve(__dirname, 'dist')
	},

	plugins: [new webpack.ProgressPlugin(),
						new HtmlWebpackPlugin({
																		template: __dirname + '/src/index.html',
																		filename: "index.html"
																	})],

	module: {
		rules: [
			{
				test   : /.(js|jsx)$/,
				include: [path.resolve(__dirname, 'src/js')],
				resolve: {
					extensions: [".js", ".jsx"]
				},
				loader : 'babel-loader',

				options: {
					plugins: ['syntax-dynamic-import'],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				}
			},
			{
				test   : /\.css$/i,
				loader : 'css-loader',
				options: {
					url: true,
				},
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use : [
					'file-loader',
				],
			},
		]
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test    : /[\\/]node_modules[\\/]/
				}
			},

			chunks   : 'async',
			minChunks: 1,
			minSize  : 30000,
			name     : true
		}
	},

	devServer: {
		open : true,
		proxy: {
			'/api': 'http://localhost:3000'
		}
	}
}
