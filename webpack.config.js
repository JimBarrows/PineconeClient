var debug   = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path    = require('path');

module.exports = {
	context: __dirname + "/src"
	, devtool: debug ? "inline-sourcemap" : null
	, entry: ['./js/client.js']
	, module: {
		debug: true,
		loaders: [{
			test: /\.css$/,
			loader: "style-loader!css-loader"
		}, {
			test: /\.js?$/
			, loader: 'babel'
			, exclude: /(node_modules|bower_components)/
			, query: {
				presets: ['react', 'es2015', 'stage-2']
				, plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
			}
		}, {
			test: /\.jsx$/
			, loader: 'babel'
			, query: {
				presets: ['react', 'es2015', 'stage-2']
				, plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
			}
		},
			{test: /\.json$/, loader: "json"},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
			{test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
			{test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}]
	}
	, resolve: {
		extensions: ['', '.js', '.jsx'],
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
				target: 'http://0.0.0.0:3000/',
				secure: false
			}
		}
	}
};