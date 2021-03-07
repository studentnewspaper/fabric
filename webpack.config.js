const path = require("path");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const mode =
  process.env.NODE_ENV != null ? process.env.NODE_ENV : "development";

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
      fastify: "commonjs2 fastify",
      "fastify-static": "commonjs2 fastify-static",
    },
  ],
  devtool: false,
  output: {
    path: path.resolve(__dirname, "build/server"),
    filename: "index.js",
    assetModuleFilename: "../static/[hash][ext][query]",
  },
});

const clientConfig = (base) => ({
  ...base,
  name: "client",
  target: "web",
  entry: {
    home: "./src/web/home/client.tsx",
    live: "./src/web/live/client.tsx",
  },
  output: {
    path: path.resolve(__dirname, "build/static"),
    filename: "[name].[contenthash].js",
    publicPath: "/static/",
    assetModuleFilename: "static/[hash][ext][query]",
  },
  plugins: [new WebpackManifestPlugin()],
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
