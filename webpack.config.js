const path = require("path");

module.exports = (env, argv) => {
  const configurations = [
    {
      target: "node",
      entry: "./src/server/index.tsx",
      externals: [{ fastify: "commonjs2 fastify" }],
      devtool: false,
      output: {
        path: path.resolve(__dirname, "build"),
        filename: "server.js",
      },
    },
    {
      target: "web",
      entry: {
        home: "./src/web/home/client.tsx",
      },
      output: {
        path: path.resolve(__dirname, "build/client"),
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
            loader: "babel-loader",
          },
        ],
      },
    };
  });
};
