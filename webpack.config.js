const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ExtensionReloader = require("webpack-extension-reloader");
const { VueLoaderPlugin } = require("vue-loader");
const { version, description } = require("./package.json");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const pathPolyfill = require.resolve("webextension-polyfill");
const arrayCopyPlugin = [
  { from: "icons", to: "icons", ignore: ["icon.xcf"] },
  {
    from: "manifest.json",
    to: "manifest.json",
    transform: content => {
      let jsonContent = JSON.parse(content);
      jsonContent = Object.assign(jsonContent, {
        version,
        description
      });

      if (config.mode === "development") {
        jsonContent["content_security_policy"] =
          "script-src 'self' 'unsafe-eval'; object-src 'self'";
      }

      return JSON.stringify(jsonContent, null, 2);
    }
  }
];
const config = {
  mode: "production",
  context: __dirname + "/src",
  entry: {
    background: "./background.js",
    contentScript: "./contentScript.js",
    "popup/popup": "./popup/popup.js",
    "options/options": "./options/options.js"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  },
  resolve: {
    extensions: [".js", ".vue"]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loaders: "vue-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "./images/"
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "./fonts/"
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      global: "window"
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new CopyPlugin(arrayCopyPlugin),
    new HtmlWebpackPlugin({
      filename: "options/options.html",
      template: "vue.html",
      chunks: ["options/options"]
    }),
    new HtmlWebpackPlugin({
      filename: "popup/popup.html",
      template: "vue.html",
      chunks: ["popup/popup"]
    })
  ],
  devtool: "inline-source-map"
};

if (process.argv.indexOf("--watch") > 0) {
  config.mode = "development";
  config.plugins = (config.plugins || []).concat([
    new ExtensionReloader({
      manifest: __dirname + "/src/manifest.json"
    })
  ]);
} else {
  config.plugins.unshift(new CleanWebpackPlugin());
}

module.exports = config;
