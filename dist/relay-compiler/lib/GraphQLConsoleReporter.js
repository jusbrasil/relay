/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule GraphQLConsoleReporter
 * 
 * @format
 */

'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var chalk = require('chalk');

var GraphQLConsoleReporter = function () {
  function GraphQLConsoleReporter(options) {
    (0, _classCallCheck3['default'])(this, GraphQLConsoleReporter);

    this._verbose = options.verbose;
  }

  GraphQLConsoleReporter.prototype.reportError = function reportError(caughtLocation, error) {
    process.stdout.write(chalk.red('ERROR:\n' + error.message + '\n'));
    if (this._verbose) {
      var frames = error.stack.match(/^ {4}at .*$/gm);
      if (frames) {
        process.stdout.write(chalk.gray('From: ' + caughtLocation + '\n' + frames.join('\n') + '\n'));
      }
    }
  };

  return GraphQLConsoleReporter;
}();

module.exports = GraphQLConsoleReporter;