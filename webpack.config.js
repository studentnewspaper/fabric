const path = require("path");
const { DefinePlugin } = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");

const mode =
  process.env.NODE_ENV != null ? process.env.NODE_ENV : "development";
const gzipTest = /\.js$|\.css$/;

const baseConfig = () => ({
  mode,
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: { cacheDirectory: true },
        },
      },
      {
        test: /\.(css)$/i,
        type: "asset/resource",
      },
    ],
  },
});

const serverConfig = (base) => ({
  ...base,
  name: "server",
  target: "node",
  entry: "./src/server/index.tsx",
  externals: [
    {
      express: "commonjs2 express",
      "express-serve-static": "commonjs2 express-serve-static",
    },
  ],
  devtool: false,
  output: {
    path: path.resolve(__dirname, "build/server"),
    filename: "index.js",
    assetModuleFilename: "../static/[hash][ext][query]",
  },
  plugins: [new DefinePlugin({ "typeof window": JSON.stringify("undefined") })],
});

const clientConfig = (base) => ({
  ...base,
  name: "client",
  target: "web",
  entry: {
    home: "./src/web/home/client.tsx",
    live: "./src/web/live/client.tsx",
    search: "./src/web/search/client.tsx",
  },
  devtool: mode == "development" ? "source-map" : false,
  output: {
    path: path.resolve(__dirname, "build/static"),
    filename: "[name].[contenthash].js",
    publicPath: "/static/",
    assetModuleFilename: "static/[hash][ext][query]",
  },
  plugins: [
    new DefinePlugin({
      "typeof window": JSON.stringify("object"),
      "process.env.NODE_ENV": JSON.stringify(mode),
      "process.env.VAPID_PUBLIC": JSON.stringify(
        "BPCowe_Dpo9VjGsjuwI_r-XwSPXm2jjuM5ffK8hKMZZ-b0bQ9JICpDI3KUk_eQ393JjPy5msPniG-ZKiH1bjAhc"
      ),
      "process.env.NOTIFICATION_ORIGIN": JSON.stringify(
        mode == "production"
          ? "https://notifications.fabric.studentnewspaper.org"
          : "http://localhost:8001"
      ),
    }),
    mode == "production" &&
      new CompressionPlugin({
        algorithm: "gzip",
        filename: "[path][base].gz",
        test: gzipTest,
      }),
    mode == "production" &&
      new CompressionPlugin({
        algorithm: "brotliCompress",
        filename: "[path][base].br",
        test: gzipTest,
      }),
    new WebpackManifestPlugin(),
    mode == "production" &&
      new InjectManifest({ swSrc: "./src/web/service-worker.ts" }),
  ].filter((x) => !!x),
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2,
        },
      },
    },
  },
});

module.exports = function (env, argv) {
  console.log(`Running webpack in ${mode}`);
  const base = baseConfig();
  return [clientConfig(base), serverConfig(base)];
};
