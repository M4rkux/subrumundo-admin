module.exports = {
  extends: "stylelint-config-standard",
  rules: {
    "at-ule-unknown": [
      true,
      {
        ignoreAtRule: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "mixin",
          "include",
        ],
      },
    ],
    "no-descending-specifity": true,
    "no-empty-souce": null,
  },
};
