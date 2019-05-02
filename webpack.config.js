const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let HTMLPlugins = [];
let Entries = {};
const HTMLDirs = [
	'index',
	'menu',
	'checkers',
	'starship',
	'crypt',
	'labyrinth'
];


HTMLDirs.forEach((page) => {
	const htmlPlugin = new HTMLWebpackPlugin({
		filename: `${page}.html`,
		template: 'html-withimg-loader!' + path.resolve(__dirname, `./src/${page}.html`),
		chunks: [page, 'commons'],
		minify: false
	})
	HTMLPlugins.push(htmlPlugin);
	Entries[page] = path.resolve(__dirname, `./src/js/${page}.js`);
})

module.exports = {
	entry: Entries,
	output:{
		filename:'js/[name].bundle.[hash].js',
		path:path.resolve(__dirname, './dist')
	},
	devtool: 'eval-source-map',
	  devServer: {
	    contentBase: './dist'
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: true,
							}
						},
						{
							loader: 'sass-loader'
						}
					]
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
	          presets: ['es2015']
	        }
				}
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				use:[
					{
						loader:'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'assets/img/'
						}
					},
					{
			      loader: 'image-webpack-loader',
			      options: {
			        mozjpeg: {
			          progressive: true,
			          quality: 65
			        },
			        // optipng.enabled: false will disable optipng
			        optipng: {
			          enabled: false,
			        },
			        pngquant: {
			          quality: '65-90',
			          speed: 4
			        },
			        gifsicle: {
			          interlaced: false,
			        },
			        // the webp option will enable WEBP
			        webp: {
			          quality: 75
			        }
			      }
					}
		  	]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader']
			}
		]
	},
	resolve: {
		alias:{
			'@': path.resolve(__dirname, './src')
		}
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'css/[name].css',
      allChunks: true,
		}),
		new CleanWebpackPlugin(['dist']),
		new UglifyJsPlugin({ sourceMap: false }),
		...HTMLPlugins
	]
}
