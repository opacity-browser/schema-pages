const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    'new-tab': './src/pages/new-tab/index.tsx',
    'settings': './src/pages/settings/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      filename: 'new-tab/index.html',
      template: './src/pages/new-tab/index.html',
      chunks: ['new-tab'] 
    }),
    new HtmlWebpackPlugin({ 
      filename: 'not-connect-host/index.html',
      template: './src/pages/not-connect-host/index.html',
      chunks: ['not-connect-host'] 
    }),
    new HtmlWebpackPlugin({ 
      filename: 'not-connect-internet/index.html',
      template: './src/pages/not-connect-internet/index.html',
      chunks: ['not-connect-internet'] 
    }),
    new HtmlWebpackPlugin({ 
      filename: 'not-find-host/index.html',
      template: './src/pages/not-find-host/index.html',
      chunks: ['not-find-host'] 
    }),
    new HtmlWebpackPlugin({ 
      filename: 'unknown/index.html',
      template: './src/pages/unknown/index.html',
      chunks: ['unknown'] 
    }),
    new HtmlWebpackPlugin({ 
      filename: 'settings/index.html',
      template: './src/pages/settings/index.html',
      chunks: ['settings'] 
    })
  ],
}