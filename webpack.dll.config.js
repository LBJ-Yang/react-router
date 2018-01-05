const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		bundle: ['react','react-dom','react-router-dom']
	},
	output: {
		path: path.join(__dirname,'public/lib'),
		filename: '[name].dll.js',
		library: '[name]_library'
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname,'public/lib','[name]-mainfest.json'),
			name:'[name]_library'
		})
	]
};