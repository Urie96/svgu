const clipboardy = require('clipboardy');
const fs = require('fs');
const chalk = require('chalk');
const svgu = require('./index.js');

function printProfitInfo(inBytes, outBytes) {
  var profitPercents = 100 - (outBytes * 100) / inBytes;
  console.log(
    Math.round((inBytes / 1024) * 1000) / 1000 +
      ' KiB' +
      (profitPercents < 0 ? ' + ' : ' - ') +
      chalk.green(Math.abs(Math.round(profitPercents * 10) / 10) + '%') +
      ' = ' +
      Math.round((outBytes / 1024) * 1000) / 1000 +
      ' KiB'
  );
}

function printTimeInfo(time) {
  console.log(`Copied in ${time} ms!`);
}

module.exports.run = function run() {
  const svgPath = process.argv.pop();
  const startTime = Date.now();
  fs.readFile(svgPath, (err, data) => {
    const prevFileSize = data.length;
    svgu(data)
      .then(({ deuri, uri }) => {
        printProfitInfo(prevFileSize, deuri.length);
        return clipboardy.write(uri);
      })
      .then(() => {
        printTimeInfo(Date.now() - startTime);
      });
  });
};
