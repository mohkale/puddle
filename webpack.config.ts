import path from 'path';
import webpack, { Configuration } from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import CompressionWebpackPlugin from 'compression-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

/**
 * resolve a path relative to the root directory of this project.
 *
 * @param args the remaining path vars passed to {@code path.resolve}.
 */
function pathResolve(...args: string[]): string {
  return path.resolve(__dirname, ...args)
}

const excludes: string[] = [
  pathResolve('vendor', 'node'),
  pathResolve('node_modules')
]

const sharedConfig: Configuration = {
  mode: 'development'
}

type EnvironmentType = { [key: string]: boolean }
type ConfigurationFunction = (env: String) => webpack.Configuration;

let mainConfig: ConfigurationFunction = env => Object.assign({}, sharedConfig, {
  entry: './src/index',
  output: {
    path: pathResolve('build'),
    filename: '[name].bundle.js'
  },
  devtool: (env === "production") ? false : "inline-source-map",
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
    alias: {
      // use this to access from root of src hirearchy.
      '@puddle': pathResolve('src')
    }
  },
  optimization: {
    minimize: env === "production",
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          output: {
            comments: false,
          }
        },
        extractComments: false
      }),
      new CompressionWebpackPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(s[ca]ss|css)/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: env === "production",
      }
    }),
  ],
  devServer: {
    port: 8000,
    compress: true,
    inline: true,
    stats: {
      all: false,
      modules: true,
      maxModules: 0,
      errors: true,
      warnings: true,
      logging: "warn",
      colors: true,
    }
  }
});


export default (env: EnvironmentType) => {
  let environment: string = ""
  if (env && env.production) {
    environment = "production"
  }

  return [mainConfig].map(c => {
    if (c instanceof Function) {
      return (c as ConfigurationFunction)(environment)
    }

    return c
  })
}
