const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  target: 'web',
  context: `${__dirname}/src`,
  entry: {
    background: './background',
    'content-script': './content-script',
    popup: './popup',
  },
  output: {
    path: `${__dirname}/app`,
    filename: '[name].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        type: 'asset/source',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        'icon.png',
        {
          from: 'manifest.json',
          transform: (content) => {
            return Buffer.from(
              JSON.stringify({
                ...JSON.parse(content.toString()),
                name: process.env.npm_package_productName,
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
              })
            )
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './popup.html',
      filename: './popup.html',
      chunks: ['popup'],
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '~': `${__dirname}/src/`,
      '~~': `${__dirname}/`,
    },
  },
}
