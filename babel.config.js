module.exports = (api) => {
  return {
    presets: [
      "@babel/preset-typescript",
      [
        "@babel/preset-env",
        {
          useBuiltIns: "entry",
          corejs: 3,
          targets: api.caller((caller) => caller && caller.target == "node")
            ? { node: "current" }
            : undefined,
        },
      ],
    ],
    plugins: [
      "@emotion",
      [
        "@babel/transform-react-jsx",
        {
          runtime: "automatic",
          importSource: "@emotion/react",
        },
      ],
    ],
  };
};
