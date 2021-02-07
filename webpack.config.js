var path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/index.js",
  target: "node",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.js|.jsx?$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: "react-svg-loader",
      },
    ],
  },
  resolve: {
    extensions: [".jsx", ".js"],
  },
  externals: ["commonjs", "react", nodeExternals()],
};
