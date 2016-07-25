'use strict';

var Chalk = require('chalk');

module.exports = function (err, data, pkgPath) {

  var returnString = '',
    testName = '',
    details = '';

  if (err) {
    return 'Debug output: ' + JSON.stringify(Buffer.isBuffer(data) ? data.toString() : data) + '\n' + err;
  }

  if (data.length === 0) {
    return Chalk.green('(+)') + ' No known vulnerabilities found';
  }

  returnString += Chalk.red('(+) ') + data.length + ' vulnerabilities found\n';

  data.forEach(function (finding) {

    testName = 'nsp ' + finding.id + ' - ' + finding.module;
    details = 'Module: ' + finding.module + '\n';
    details += 'Recommendation: ' + finding.recommendation + '\n';
    details += 'Installed: ' + finding.version + '\n';
    details += 'Vulnerable: ' + (finding.vulnerable_versions === '<=99.999.99999' ? 'All' : finding.vulnerable_versions) + '\n';
    details += 'Patched: ' + (finding.patched_versions === '<0.0.0' ? 'None' : finding.patched_versions) + '\n';
    details += 'Path: ' + finding.path.join(' > ') + '\n';
    details += 'File Name: ' + pkgPath + '\n';
    details += 'Overview: ' + finding.overview + '\n';
    details += 'More Info: ' + finding.advisory + '\n';
    logMsg('##teamcity[testStarted name=\'' + testName + '\']');
    logMsg('##teamcity[testFailed name=\'' + testName + '\'' + 'message=\'' + finding.title + '\' details=\'' + details  + '\']');
    logMsg('##teamcity[testFinished name=\'' + testName + '\']');
  });
  
  function logMsg(msg) {
    returnString += msg + '\n';
  }

  return returnString;
};
