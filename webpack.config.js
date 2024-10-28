const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // adaugă această linie

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
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
          filename: 'images/[name][ext]' // păstrează structura de foldere pentru imagini
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [  // adaugă această secțiune
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: 'images',  // folderul sursă cu imagini
          to: 'images'     // folderul destinație în dist
        },
        { 
          from: '*.html',  // alte fișiere HTML
          to: '[name][ext]',
          globOptions: {
            ignore: ['index.html'] // exclude index.html pentru că e tratat separat
          }
        }
      ]
    })
  ]
};