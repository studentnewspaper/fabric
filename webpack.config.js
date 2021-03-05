const path = require("path");

module.exports = (env, argv) => {
  const configurations = [
    {
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
        path: path.resolve(__dirname, "build"),
        filename: "server.js",
        assetModuleFilename: "static/[hash][ext][query]",
      },
    },
    {
      target: "web",
      entry: {
        home: "./src/web/home/client.tsx",
      },
      output: {
        path: path.resolve(__dirname, "build/static"),
        assetModuleFilename: "static/[hash][ext][query]",
      },
    },
  ];

  return configurations.map((configuration) => {
    return {
      ...configuration,
      mode: "development",
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
    };
  });
};
