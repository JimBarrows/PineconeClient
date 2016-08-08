var debug   = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');

module.exports = {
	context: __dirname + "/src"
	, devtool: debug ? "inline-sorucemap" : null
	, entry: ['./js/client.js']
	, module: {
		loaders: [{
			test: /\.css$/,
			loader: "style-loader!css-loader"
		}, {
			loader: 'babel'
			, test: /\.js?$/
			, exclude: /(node_modules|bower_components)/
			, query: {
				presets: ['react', 'es2015', 'stage-2']
				, plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
			}
		}, {
			test: /\.json$/,
			loader: "json"
		}]
	}
	, output: {
		path: __dirname + "/src/"
		, filename: "client.min.js"
	}
	, plugins: debug ? [] : [
		new webpack.optimize.DedupePlugin()
		, new webpack.optimize.OccurenceOrderPlugin()
		, new webpack.optimize.UglifyPlugin({mangle: false, sourcemap: false})
	]
	, devServer: {
		contentBase: "src"
		, hot: true
		, proxy: {
			'/api/*': {
				target: 'http://localhost:3000/',
				secure: false
			}
		}
	}
};