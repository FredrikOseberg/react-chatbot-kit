module.exports = function(api) {
  api.cache(true);
  const presets = ['@babel/env', '@babel/react'];
  const plugins = [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-react-jsx',
    '@babel/plugin-proposal-class-properties'
  ];

  return {
    presets,
    plugins
  };
};
