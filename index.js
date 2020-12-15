const SVGO = require('svgo');
const svgToUri = require('mini-svg-data-uri');

module.exports = function svgu(svgData) {
  return new SVGO().optimize(svgData).then(({ data }) => ({
    uri: svgToUri(data),
    deuri: data,
  }));
};
