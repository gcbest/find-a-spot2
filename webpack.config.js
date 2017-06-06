var webpack = require('webpack');

module.exports = {
  entry: [
      'script-loader!jquery/dist/jquery.min.js',
      'script-loader!foundation-sites/dist/js/foundation.min.js',
      './app/app.jsx'
  ],
    externals: {
        jquery: 'jQuery'
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery'
        })
    ],
    output: {
      path: __dirname,
        filename: './public/bundle.js'
    },
    resolve: {
        // alias: {
        //     applicationStyles: 'app/styles/app.css'
        // },
      extensions: ['.js', '.jsx']
    },
    module: {
      // need loaders because webpack cannot read jsx without them, it is expecting regular javascript
      loaders: [
          {
             loader: 'babel-loader',
              query: {
                 // take our files and parse them thru react and then turn them into es2015
                 presets: ['react', 'es2015', 'stage-0']
              },
              // let webpack know which folders we want to have parsed
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/
          }
      ]
    },
    devtool: 'cheap-module-eval-source-map'
};