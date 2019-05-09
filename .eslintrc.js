module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/airbnb"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    quotes: ["error", "double"],
    "comma-dangle": ["error", "never"],
    "linebreak-style": 0,
    "implicit-arrow-linebreak": ["error", "below"]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
