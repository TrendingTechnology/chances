const postcssPresetEnv = require(`postcss-preset-env`);
const postcssFontSmoothing = require(`postcss-font-smoothing`);
const postcssNested = require(`postcss-nested`);
const cssMqpacker = require(`css-mqpacker`);

module.exports = () => ({
  plugins: [
    postcssPresetEnv({
      stage: 0,
      autoprefixer: { grid: true },
    }),
    postcssNested(),
    postcssFontSmoothing(),
    cssMqpacker({ sort: true }),
  ],
});
