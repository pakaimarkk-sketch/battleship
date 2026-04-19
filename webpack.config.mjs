import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
    clean: true,
  },
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    static: "./dist",
    open: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.svg$/i,
        type: "asset/resource",
      },
    ],
  },
};
