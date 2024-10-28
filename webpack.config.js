const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',  // Adăugăm contenthash pentru cache busting
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    chunkFilename: '[name].[contenthash].chunk.js'  // Pentru code splitting
  },
  optimization: {
    moduleIds: 'deterministic',  // Ajută la stabilitatea hash-urilor
    runtimeChunk: 'single',      // Extrage runtime-ul webpack
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        components: {
          test: /[\\/]src[\\/]components[\\/]/,
          name: 'components',
          chunks: 'all',
          enforce: true,
        }
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-syntax-dynamic-import']  // Pentru import dinamic
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext]'  // Adăugăm hash pentru cache busting
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),  // Pentru importuri mai curate
      '@images': path.resolve(__dirname, 'src/images/'),
    }
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: 'images',
          to: 'images'
        },
        { 
          from: '*.html',
          to: '[name][ext]',
          globOptions: {
            ignore: ['index.html']
          }
        },
        { 
          from: '*.css',
          to: '[name].[contenthash][ext]'  // Adăugăm contenthash pentru CSS
        }
      ]
    })
  ],
  // Adăugăm configurație pentru development
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 3000,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
  },
  // Optimizări pentru producție
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
};