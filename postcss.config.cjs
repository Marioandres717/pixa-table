// eslint-disable-next-line no-undef
module.exports = ({ env }) => {
  const isProduction = env === "production";
  return {
    plugins: {
      ["postcss-nested"]: {},
      tailwindcss: {},
      "postcss-prefix-selector": isProduction && {
        // tailwind come with is own css reset (preflight), we don't want for consuming apps to have their css reset by tailwind
        prefix: ":where(.pxt)",
        transform(prefix, selector, prefixedSelector) {
          // Apply the prefix to all selectors
          return prefixedSelector;
        },
      },
      autoprefixer: {},
    },
  };
};
