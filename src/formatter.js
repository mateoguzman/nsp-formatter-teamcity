'use strict';

var Chalk = require('chalk');

module.exports = function (err, data, pkgPath) {

  var returnString = '';

  if (err) {
    return 'Debug output: ' + JSON.stringify(Buffer.isBuffer(data) ? data.toString() : data) + '\n' + err;
  }

  if (data.length === 0) {
    return Chalk.green('(+)') + ' No known vulnerabilities found';
  }

  returnString += Chalk.red('(+) ') + data.length + ' vulnerabilities found\n';

  data.forEach(function (finding) {

    var testName = 'NSP ' + finding.id + ' - ' + finding.module;
    logMsg('##teamcity[testStarted name=\'' + testName + '\']');
    logMsg('##teamcity[testFailed name=\'' + testName + '\'' + 'message=\'' + finding.title + '\']');
    logMsg('Module: ' + finding.module);
    logMsg('Recommendation: ' + finding.recommendation);
    logMsg('Overview: ' + finding.overview);
    logMsg('Installed: ' + finding.version);
    logMsg('Vulnerable: ' + (finding.vulnerable_versions === '<=99.999.99999' ? 'All' : finding.vulnerable_versions));
    logMsg('Patched: ' + (finding.patched_versions === '<0.0.0' ? 'None' : finding.patched_versions));
    logMsg('Path: ' + finding.path.join(' > '));
    logMsg('More Info: ' + finding.advisory);
    logMsg('##teamcity[testFinished name=\'' + testName + '\']');
  });
  
  function logMsg(msg){
    returnString += msg + '\n';
  }

  return returnString;
};
