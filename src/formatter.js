'use strict';

module.exports = function (err, data, pkgPath) {

  if (err) {
    return 'Debug output: ' + JSON.stringify(Buffer.isBuffer(data) ? data.toString() : data) + '\n' + err;
  }

  //return JSON.stringify(data, null, 2);


  var returnString = '';

  data.forEach(function (finding) {

    logMsg('##teamcity[testStarted name=\'' + finding.id + '\']');
    logMsg('##teamcity[testFailed name=\'' + finding.id + '\'' + 'message=\'' + finding.title + '\']');
    logMsg('Module: ' + finding.module);
    logMsg('Installed: ' + finding.version);
    logMsg('Vulnerable: ' + (finding.vulnerable_versions === '<=99.999.99999' ? 'All' : finding.vulnerable_versions));
    logMsg('Patched: ' + (finding.patched_versions === '<0.0.0' ? 'None' : finding.patched_versions));
    logMsg('Path: ' + finding.path.join(' > '));
    logMsg('More Info: ' + finding.advisory);
    logMsg('##teamcity[testFinished name=\'' + finding.id + '\']');
  });
  
  function logMsg(msg){
    returnString += msg + '\n';
  }

  return returnString;
};
