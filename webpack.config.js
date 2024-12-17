module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'], // Carga PostCSS
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devServer: {
      static: path.join(__dirname, 'public'),
      port: 3001,
    },
  };