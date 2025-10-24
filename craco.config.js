module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      });
      
      // Disable source map warnings
      webpackConfig.ignoreWarnings = [
        /Failed to parse source map/,
        /ENOENT: no such file or directory/,
      ];
      
      return webpackConfig;
    },
  },
};
