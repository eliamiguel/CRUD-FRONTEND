module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest", 
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios|other-es-module)/)",
  ],
};
